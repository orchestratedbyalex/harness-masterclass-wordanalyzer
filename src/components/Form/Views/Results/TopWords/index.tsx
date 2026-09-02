import React from 'react';
//External libs
import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@material-ui/core';
import { EmojiEvents } from '@material-ui/icons';
import { connect } from 'react-redux';

// local libs
import { WordFrequencyAnalyzer } from '../../../../../lib';

//redux
import { calculateFrequency, clearFrequencyState, setWordToCalculateFrequency } from '../../../../../redux/actions/form';

// styles
import '../Results.css';

//interfaces
import { ITopWords } from '../../../../../interfaces/ITopWords';
import { IWordFrequency } from '../../../../../lib/interfaces/IWordFrequency';

// constants
import { top20Colors } from '../../../../../constants/TopFrecuencyColors';

const wordFrequencyAnalyzer: WordFrequencyAnalyzer = new WordFrequencyAnalyzer();

const normalizeTopNumberOfWords = (value: string): number => {
    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) return 1;

    return Math.min(100, Math.max(1, Math.floor(parsedValue)));
}

// dispatch redux actions when clicking a word for frequency calculation and display as highlighted
const onClickListItem = (wordToCalculate: string, dispatch: any) => {
    dispatch(clearFrequencyState());
    dispatch(setWordToCalculateFrequency(wordToCalculate));
    dispatch(calculateFrequency());
}

const TopWords: React.FunctionComponent<ITopWords> = (props: ITopWords) => {

    const [topNumberOfWords, setTopNumberOfWords] = React.useState<number>(3);

    const wordFrequencyArray: IWordFrequency[] = wordFrequencyAnalyzer.calculateMostFrequentNWords(props.text, topNumberOfWords);

    return (
        <Paper component="section" elevation={0} className="detailsWrapper" aria-labelledby="top-words-heading">
            <div className="detailsHeader">
                <div className="resultIcon" aria-hidden="true">
                    <EmojiEvents />
                </div>
                <Typography id="top-words-heading" variant="h6" component="h3" className="detailsTitle">
                    Top words
                </Typography>
            </div>
            <Divider />
            <div className="topWordsControl">
                <Typography variant="body2" component="span">Show</Typography>
                <TextField
                    autoComplete="off"
                    className="topWordsAmountTextField"
                    id="topWordsTextField"
                    value={topNumberOfWords}
                    onChange={(ev) => setTopNumberOfWords(normalizeTopNumberOfWords(ev.target.value))}
                    inputProps={{
                        max: 100,
                        min: 1,
                        'aria-label': 'Number of top words',
                    }}
                    type="number"
                    variant="outlined"
                />
                <Typography variant="body2" component="span">words</Typography>
            </div>
            <List
                component="nav"
                aria-labelledby="top-words-heading"
                className="resultList"
            >
                <Typography className='frequencyTitle' component="p">Frequency</Typography>
                {
                    wordFrequencyArray.map((word, index) => {
                        return (
                            <ListItem
                                button
                                aria-label={`${word.getWord()}, ${word.getFrequency()} occurrences`}
                                key={word.getWord() + "_" + word.getFrequency() + "__li"}
                                onClick={() => onClickListItem(word.getWord(), props.dispatch)}>
                                <ListItemIcon>
                                    <Avatar className="frequencyBadge" style={{ backgroundColor: top20Colors[index % top20Colors.length] }}>
                                        {word.getFrequency()}
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary={word.getWord()} />
                            </ListItem>
                        )
                    })
                }
            </List>
        </Paper>
    );
};


const mapStateToProps = (state: any) => ({ text: state.form.text });

export default connect(mapStateToProps)(TopWords);
