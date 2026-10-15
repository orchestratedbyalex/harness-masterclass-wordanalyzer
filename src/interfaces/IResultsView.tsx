import { IDispatcher } from './IDispatcher';


export interface IResultsView extends IDispatcher {
    text: string;
    wordToCalculateFrequency: string;
}
