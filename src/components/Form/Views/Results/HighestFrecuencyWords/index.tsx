import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@material-ui/core';
import { TrendingUp } from '@material-ui/icons';
import React from 'react';

// external libs
import { connect } from 'react-redux';

//local libs
import { WordFrequencyAnalyzerHelper } from '../../../../../lib/WordFrecuencynalyzerHelper';

// interfaces
import { IWordFrequency } from '../../../../../lib/interfaces/IWordFrequency';
import { top20Colors } from '../../../../../constants/TopFrecuencyColors';


//styles
import '../Results.css';
import { IHighestFrequencyWords } from '../../../../../interfaces/IHighestFrequencyWords';
import { calculateFrequency, clearFrequencyState, setWordToCalculateFrequency } from '../../../../../redux/actions/form';

const wordFrequencyAnalyzerHelper: WordFrequencyAnalyzerHelper = new WordFrequencyAnalyzerHelper();

// dispatch redux actions when clicking a word for frequency calculation and display as highlighted
const onClickListItem = (wordToCalculate: string, dispatch: any) => {
    dispatch(clearFrequencyState());
    dispatch(setWordToCalculateFrequency(wordToCalculate));
    dispatch(calculateFrequency());
}

// component that renders the highest frequency words widget
const HighestFrequencyWords: React.FunctionComponent<IHighestFrequencyWords> = (props: IHighestFrequencyWords) => {

    const mostFrequentWords: IWordFrequency[] = wordFrequencyAnalyzerHelper.getMostFrecuentWordsFromText(props.text);

    return (
        <Paper component="section" elevation={0} className="detailsWrapper" aria-labelledby="highest-words-heading">
            <div className="detailsHeader">
                <div className="resultIcon" aria-hidden="true">
                    <TrendingUp />
                </div>
                <Typography id="highest-words-heading" variant="h6" component="h3" className="detailsTitle">
                    Highest frequency
                </Typography>
            </div>
            <Divider />
            <List
                component="nav"
                aria-labelledby="highest-words-heading"
                className="resultList" >
                <Typography className='frequencyTitle' component="p">Frequency</Typography>
                {
                    mostFrequentWords.map((word, index) => {
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

export default connect(mapStateToProps)(HighestFrequencyWords);
