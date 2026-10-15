import React from 'react';
// External libs
import { Button, Typography } from '@material-ui/core';
import { TextFields } from '@material-ui/icons';
import { motion, useReducedMotion } from 'framer-motion';
import { connect } from 'react-redux';
//local components
import TextInput from '../../../TextInput';
// enumos
import { FormView } from '../../../../enums/FormView';
//redux
import { clearFrequencyState, setFormView, setText } from '../../../../redux/actions/form';
// interfaces
import { IDefaultView } from '../../../../lib/interfaces/IDefaultView';
//styles
import './Default.css';
import { WordFrequencyAnalyzerHelper } from '../../../../lib/WordFrecuencynalyzerHelper';

// clean state - move to results view
const cleanFrequencyStateAndGoToResultsView = (dispatch: any) => {
    dispatch(clearFrequencyState());
    dispatch(setFormView(FormView.RESULTS_VIEW));
}

const wordFrequencyAnalyzerHelper: WordFrequencyAnalyzerHelper = new WordFrequencyAnalyzerHelper();

// component that renders main input text form
const DefaultView: React.FunctionComponent<IDefaultView> = (props: IDefaultView) => {

    const totalAmountOfWords: number = wordFrequencyAnalyzerHelper.countWordsInText(props.text);
    const isAnalizedButtonEnabled: boolean = totalAmountOfWords > 0;
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.section
            aria-labelledby="input-view-title"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className='textFieldContainer'>
            <div className="defaultViewHeader">
                <Typography id="input-view-title" variant="h4" component="h2" className="defaultViewTitle">
                    See what stands out.
                </Typography>
                <Typography variant="body1" component="p" className="defaultViewDescription">
                    Add any passage to reveal its most frequent words and explore them in context.
                </Typography>
            </div>
            <TextInput onTextChange={(newText: string) => props.dispatch && props.dispatch(setText(newText))} />
            <div className="analyzeActionWrapper">
                <Button
                    disabled={!isAnalizedButtonEnabled}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => props.dispatch && cleanFrequencyStateAndGoToResultsView(props.dispatch)}
                    endIcon={<TextFields />}>
                    Analyze
                </Button>
            </div>
        </motion.section>
    );
};

// redux state to props
const mapStateToProps = (state: any) => ({ text: state.form.text });

export default connect(mapStateToProps)(DefaultView);
