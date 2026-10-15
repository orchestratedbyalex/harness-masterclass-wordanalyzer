import { IWordFrequency } from '../interfaces/IWordFrequency';
import { IWordFrequencyAnalyzer } from '../interfaces/iWordFrequencyAnalyzer';
import { WordFrequencyAnalyzerHelper } from '../WordFrecuencynalyzerHelper';
import { WordFrequency } from '../WordFrequency';

export class WordFrequencyAnalyzer implements IWordFrequencyAnalyzer {

    private _wordFrecuencyHelper: WordFrequencyAnalyzerHelper;

    constructor() {
        this._wordFrecuencyHelper = new WordFrequencyAnalyzerHelper();
    }

    public calculateHighestFrequency = (text: string): number => {

        return this.calculateMostFrequentNWords(text, 1)[0].getFrequency();
    }

    public calculateFrequencyForWord = (text: string, word: string): number => {

        // return a RegExp match array of only words of the text
        let arrOfWords: RegExpMatchArray | null = text.match(this._wordFrecuencyHelper.regExp_OnlyWords);

        return arrOfWords ?
            this._wordFrecuencyHelper.countWordOccurrencesInArray(arrOfWords.map(w => w.toLowerCase()), word.toLowerCase())
            :
            0;
    }

    public calculateMostFrequentNWords = (text: string, n: number): IWordFrequency[] => {

        // Get array of unique words from text
        let uniqueWordsFromText: Array<string> = this._wordFrecuencyHelper.getUniqueWordsFromText(text);

        // map through array and create IWordFrequency objects
        let result: IWordFrequency[] = uniqueWordsFromText.map(word => new WordFrequency(text, word));

        // sort in order to have the highest frequency first
        let sortedResult: IWordFrequency[] = result.sort(this._wordFrecuencyHelper.sortByFrequency);

        // return n amount of frecuent words
        return sortedResult.slice(0, n);
    }
}