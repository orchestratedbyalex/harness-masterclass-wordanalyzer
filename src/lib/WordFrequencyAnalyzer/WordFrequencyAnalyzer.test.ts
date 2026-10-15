import { WordFrequencyAnalyzer } from "..";

describe('WordFrequencyAnalyzer', () => {
    let instance: WordFrequencyAnalyzer;

    let sampleSimpleText: string = "this is the text, ThE one that rocks";
    let sampleLongerText: string = "this is the text, ThE one that rocks, the unvalid word is the3";
    let sampleWord: string = "the";

    beforeEach(() => {
        instance = new WordFrequencyAnalyzer();
    });

    it('should get frecuency of a word', async () => {
        expect(instance).toBeInstanceOf(WordFrequencyAnalyzer);
        const frecuencyForWord = await instance.calculateFrequencyForWord(sampleSimpleText, sampleWord);
        expect(frecuencyForWord).toBeDefined();
        expect(frecuencyForWord).toEqual(2);
    });

    it('should get no frecuency of an empty space', async () => {
        expect(instance).toBeInstanceOf(WordFrequencyAnalyzer);
        const frecuencyForWord = await instance.calculateFrequencyForWord(sampleSimpleText, "");
        expect(frecuencyForWord).toBeDefined();
        expect(frecuencyForWord).toEqual(0);
    });

    it('should return most frequent n words on valid test', async () => {
        expect(instance).toBeInstanceOf(WordFrequencyAnalyzer);
        const calculateMostFrequentNWords = await instance.calculateMostFrequentNWords(sampleSimpleText, 1);
        expect(calculateMostFrequentNWords).toBeDefined();
        expect(calculateMostFrequentNWords[0].getWord()).toEqual("the");
        expect(calculateMostFrequentNWords[0].getFrequency()).toEqual(2);
    });

    it('should return highest frequency', async () => {
        expect(instance).toBeInstanceOf(WordFrequencyAnalyzer);
        const calculateHighestFrequency = await instance.calculateHighestFrequency(sampleSimpleText);
        expect(calculateHighestFrequency).toBeDefined();
        expect(calculateHighestFrequency).toEqual(2);
    });

    it('should return frequency of valid words, independently if they are Capitals or Non Capitals', async () => {
        expect(instance).toBeInstanceOf(WordFrequencyAnalyzer);
        const calculateHighestFrequency = await instance.calculateFrequencyForWord(sampleLongerText, "the");
        expect(calculateHighestFrequency).toBeDefined();
        expect(calculateHighestFrequency).toEqual(3);
    });


});
