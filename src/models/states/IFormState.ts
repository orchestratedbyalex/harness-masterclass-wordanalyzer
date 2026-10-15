import { Record } from 'immutable';
import { FormView } from '../../enums/FormView';

const defaultParams = {
    text: '',
    view: FormView.DEFAULT_VIEW,
    wordToCalculateFrequency: '',
    calculatedFrequency: undefined,
    wordAsImageUrl: ''
};

export interface IFormState {
    text: string;
    view: FormView;
    wordToCalculateFrequency: string;
    calculatedFrequency: number | undefined;
    wordAsImageUrl: string;
}

export class FormState extends Record(defaultParams) implements IFormState { };

export const initialState = new FormState();
