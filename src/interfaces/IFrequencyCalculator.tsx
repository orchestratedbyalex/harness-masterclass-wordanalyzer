import { IDispatcher } from './IDispatcher';

export interface IFrequencyCalculator extends IDispatcher {
    text: string;
    wordToCalculateFrequency: string;
    wordAsImageUrl: string;
    calculatedFrequency: number | undefined;
}
