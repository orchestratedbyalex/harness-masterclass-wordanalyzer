import { IDispatcher } from './IDispatcher';



export interface ISubmitWordForm extends IDispatcher {
    wordToCalculateFrequency: string;
    onKeyDown: (e) => any;
    onChange: (e) => any;
    onSubmit: () => any;
}
