import { IAction } from '../../../models';
import { FormState, initialState as initialFormState } from '../../../models/states/IFormState';
import { CLEAR_FREQUENCY_VALUE, CLEAR_TEXT, SET_CALCULATED_FREQUENCY, CLEAR_FREQUENCY_STATE, SET_FORM_VIEW, SET_TEXT, SET_WORD_TO_CALCULATE_FREQUENCY } from '../../actions/form';




const formState = (state: FormState = initialFormState, action: IAction) => {

    switch (action.type) {

        case SET_TEXT:
            return state.set("text", action.payload);

        case SET_FORM_VIEW:
            return state.set("view", action.payload);

        case SET_WORD_TO_CALCULATE_FREQUENCY:
            return state.set("wordToCalculateFrequency", action.payload);

        case SET_CALCULATED_FREQUENCY:
            return state.merge({ calculatedFrequency: action.payload.calculatedFrequency, wordAsImageUrl: action.payload.wordAsImageUrl });

        case CLEAR_FREQUENCY_STATE:
            return state.merge({ calculatedFrequency: undefined, wordAsImageUrl: '', wordToCalculateFrequency: '' });

        case CLEAR_FREQUENCY_VALUE:
            return state.merge({ calculatedFrequency: undefined, wordAsImageUrl: '' });


        case CLEAR_TEXT:
            return state.merge({ text: '' })


        default:
            return state;
    }

};

export default formState;