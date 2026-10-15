import { WordFrequencyAnalyzer } from '..';
import { IWordFrequency } from '../interfaces/IWordFrequency';

export class WordFrequency implements IWordFrequency {

    private _word: string;
    private _frequency: number;

    private wordFrequencyAnalyzer: WordFrequencyAnalyzer = new WordFrequencyAnalyzer();

    constructor(text: string, word: string) {
        this._word = word;
        this._frequency = this.wordFrequencyAnalyzer.calculateFrequencyForWord(text, this._word);;
    }

    public getWord = (): string => {
        return this._word;
    }
    public getFrequency = (): number => {
        return this._frequency;
    }

}