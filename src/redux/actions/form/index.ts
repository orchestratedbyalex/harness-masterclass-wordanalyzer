import { put, takeEvery, select } from "@redux-saga/core/effects";
import { FormView } from "../../../enums/FormView";
import { ImageFetcher, WordFrequencyAnalyzer } from "../../../lib";
import { IAction } from "../../../models/IAction";


const wordFrequencyAnalyzer: WordFrequencyAnalyzer = new WordFrequencyAnalyzer();

const imageFetcher: ImageFetcher = new ImageFetcher();


export const SET_TEXT = "SET_TEXT";
export const SET_FORM_VIEW = "SET_FORM_VIEW";
export const SET_WORD_TO_CALCULATE_FREQUENCY = "SET_WORD_TO_CALCULATE_FREQUENCY";
export const CALCULATE_FREQUENCY = "CALCULATE_FREQUENCY";
export const SET_CALCULATED_FREQUENCY = "SET_CALCULATED_FREQUENCY";
export const CLEAR_FREQUENCY_STATE = "CLEAR_FREQUENCY_STATE";
export const CLEAR_FREQUENCY_VALUE = "CLEAR_FREQUENCY_VALUE";
export const CLEAR_TEXT = "CLEAR_TEXT";
export const ANALYZE_TEXT = "ANALYZE_TEXT";


//----------------------- ACTION CREATORS
export function setText(text: string): IAction {
    return {
        type: SET_TEXT,
        payload: text
    };
}
export function setFormView(newView: FormView): IAction {
    return {
        type: SET_FORM_VIEW,
        payload: newView
    }
}
export function analyzeText(): IAction {
    return {
        type : ANALYZE_TEXT
    }
}
export function clearFrequencyState(): IAction {
    return {
        type : CLEAR_FREQUENCY_STATE
    }
}
export function clearFrequencyValue(): IAction {
    return {
        type: CLEAR_FREQUENCY_VALUE
    }
}
export function clearTexxt(): IAction {
    return {
        type : CLEAR_TEXT
    }
}
export function setWordToCalculateFrequency(word: string): IAction {
    return {
        type: SET_WORD_TO_CALCULATE_FREQUENCY,
        payload: word
    }
}
export function calculateFrequency(): IAction {
    return {
        type: CALCULATE_FREQUENCY
    }
}
//----------------------- ACTION CREATORS


//======================= WATCHERS
export function* formWatchers(): any {
    return [
        yield takeEvery(CALCULATE_FREQUENCY, onCalculateFrequency),
        yield takeEvery(ANALYZE_TEXT, onAnalyzeText),
    ];
}
//======================= WATCHERS


//======================= SAGA'S
export function* onAnalyzeText() {

}


export function* onCalculateFrequency() {

    const state = yield select();

    let calculatedFrequency: number = wordFrequencyAnalyzer.calculateFrequencyForWord(state.form.text, state.form.wordToCalculateFrequency);

    let wordAsImageUrl = '';
    if (calculatedFrequency !== undefined && calculatedFrequency > 0) {
        let imageResponse:any = yield imageFetcher.fetchImageFromWord(state.form.wordToCalculateFrequency);
        if (imageResponse && imageResponse.hits && imageResponse.hits.length > 0) {
            wordAsImageUrl = imageResponse.hits[0].previewURL;
        }
    }

    yield put({
        type : SET_CALCULATED_FREQUENCY,
        payload: {
            calculatedFrequency, wordAsImageUrl
        }
    })


}
//======================= SAGA'S
