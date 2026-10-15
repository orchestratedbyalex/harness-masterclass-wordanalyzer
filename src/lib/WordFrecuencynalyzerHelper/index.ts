import { WordFrequencyAnalyzer } from '..';
import { IWordFrequency } from '../interfaces/IWordFrequency';
import { WordFrequency } from '../WordFrequency';


export class WordFrequencyAnalyzerHelper {

    public regExp_OnlyWords: RegExp = /\b[^\d\W]+\b/g;

    public countWordOccurrencesInArray = (arrayOfWords: Array<string>, word: string) =>
        arrayOfWords.reduce((acumulator: number, value: string) => (value === word ? acumulator + 1 : acumulator), 0);

    public countWordsInText = (text: string): number => {
        let matches = text !== undefined && text.match(this.regExp_OnlyWords);
        return matches ? matches.length : 0;
    }

    public getHighlightedWordsInText = (text: string, word: string): Array<string> => {
        // return a RegExp match array of only words of the text
        let arrOfWords: RegExpMatchArray | null = text.match(this.regExp_OnlyWords);

        // add extra spaces to simulate handlighted effect
        let extractedWords = arrOfWords?.filter(w => w.toLowerCase() === word).map(w => " " + w + " ");

        return extractedWords ? extractedWords : [];
    }

    public getUniqueWordsFromText = (text: string): Array<string> => {
        // return a RegExp match array of only words of the text
        let arrOfWords: RegExpMatchArray | null = text.toLowerCase().match(this.regExp_OnlyWords);

        // filter out duplicates
        let uniqueWords: IterableIterator<string> = new Set(arrOfWords).values();

        // turn to array for calculation
        let uniqueWordsArray: string[] = Array.from(uniqueWords);

        return uniqueWordsArray;
    }

    public sortByFrequency = (a: IWordFrequency, b: IWordFrequency): number => {

        // sort by frecuency number
        if (a.getFrequency() > b.getFrequency()) return -1;
        if (a.getFrequency() < b.getFrequency()) return 1;

        // sort as well in alphabetical order in case frequencies are the same
        if (a.getWord().toLowerCase() > b.getWord().toLowerCase()) return 1;
        if (a.getWord().toLowerCase() < b.getWord().toLowerCase()) return -1;

        return 0;
    }

    public getMostFrecuentWordsFromText = (text: string): IWordFrequency[] => { 

        let highestFrequency = new WordFrequencyAnalyzer().calculateHighestFrequency(text);

        // Get array of unique words from text
        let uniqueWordsFromText: Array<string> = this.getUniqueWordsFromText(text);

        // map through array and create IWordFrequency objects
        let result: IWordFrequency[] = uniqueWordsFromText.map(word => new WordFrequency(text, word));

        // sort in order to have the highest frequency first
        let sortedResult: IWordFrequency[] = result.sort(this.sortByFrequency);

        let highestFrequencyWords: IWordFrequency[] = sortedResult.filter(w => w.getFrequency() === highestFrequency);

        return highestFrequencyWords;
    }

}