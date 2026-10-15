import React from 'react';

//External libs
import { Button, Paper, Typography } from '@material-ui/core';
import { motion, useReducedMotion } from 'framer-motion';
import { connect } from 'react-redux';
import { Refresh, Subject } from '@material-ui/icons';
import Highlighter from "react-highlight-words";

// local libs
import { WordFrequencyAnalyzerHelper } from '../../../../lib/WordFrecuencynalyzerHelper';
import HighestFrecuencyWords from './HighestFrecuencyWords';

// local components
import TopWords from './TopWords';
import FrequencyCalculator from './FrequencyCalculator';

// redux
import { clearTexxt, setFormView } from '../../../../redux/actions/form';

// constants
import { FormView } from '../../../../enums/FormView';

// interfaces
import { IResultsView } from '../../../../interfaces/IResultsView';

// styles
import './Results.css';
import { IHighligherProps } from '../../../../interfaces/IHighligherProps';

const wordFrequencyAnalyzerHelper: WordFrequencyAnalyzerHelper = new WordFrequencyAnalyzerHelper();


const cleanStateAndGoToDefaultView = (dispatch: any) => {
    dispatch(clearTexxt());
    dispatch(setFormView(FormView.DEFAULT_VIEW));
}

const setHighlighterTextProps = (props: IResultsView): IHighligherProps => {
    // add extra spaces to simulate handlighted effect
    let textToHighlight = " " + props.text + " ";
    return { textToHighlight };
}

// component that contains rendered text and calculation widgets
const ResultsView: React.FunctionComponent<IResultsView> = (props: IResultsView) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.section
            aria-labelledby="results-title"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className='resultsContainer'>
            <header className="resultsHeader">
                <div>
                    <Typography id="results-title" variant="h4" component="h2" className="resultsTitle">
                        Your word profile
                    </Typography>
                    <Typography variant="body1" component="p" className="resultsDescription">
                        Review the strongest patterns, then select any word to see it in context.
                    </Typography>
                </div>
            </header>

            <div className="paperWrapper">
                <div className="resultIcon" aria-hidden="true">
                    <Subject />
                </div>
                <Paper
                    component="section"
                    elevation={0}
                    className='paperContainer'
                    aria-labelledby="source-text-title">
                    <Typography id="source-text-title" variant="overline" component="h3" className="sourceTextTitle">
                        Analyzed text
                    </Typography>
                    <div className="analyzedText" tabIndex={0} aria-label="Analyzed text with selected words highlighted">
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={wordFrequencyAnalyzerHelper.getHighlightedWordsInText(props.text, props.wordToCalculateFrequency)}
                            autoEscape={true}
                            caseSensitive={true}
                            textToHighlight={setHighlighterTextProps(props).textToHighlight}
                        />
                    </div>
                </Paper>
            </div>
            <div className="detailedResultsWrapper">
                <TopWords />
                <HighestFrecuencyWords />
                <FrequencyCalculator />
            </div>
            <div className="startAgainButtonWraper">
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => props.dispatch && cleanStateAndGoToDefaultView(props.dispatch)}
                    endIcon={<Refresh />}>
                    Start again
                </Button>
            </div>
        </motion.section>
    );
};


const mapStateToProps = (state: any) => ({
    text: state.form.text,
    wordToCalculateFrequency: state.form.wordToCalculateFrequency
});

export default connect(mapStateToProps)(ResultsView);
