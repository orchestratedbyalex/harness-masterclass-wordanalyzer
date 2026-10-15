import { WordFrequencyAnalyzerHelper } from ".";

describe('WordFrequency', () => {
    let instance: WordFrequencyAnalyzerHelper;
    let sampleText: string = "this is the text, ThE one that rocks";
    let sampleWord: string = "the";

    beforeEach(() => {
        instance = new WordFrequencyAnalyzerHelper();
    });

    it('should count words correctly', async () => {
        expect(instance).toBeInstanceOf(WordFrequencyAnalyzerHelper);
        const frecuencyForWord = await instance.countWordsInText(sampleText);
        expect(frecuencyForWord).toBeDefined();
        expect(frecuencyForWord).toEqual(8);
    });

    it('should get unique words correctly', async () => {
        expect(instance).toBeInstanceOf(WordFrequencyAnalyzerHelper);
        const frecuencyForWord = await instance.getUniqueWordsFromText(sampleText);
        expect(frecuencyForWord).toBeDefined();
        expect(frecuencyForWord).toEqual(["this", "is", "the", "text", "one", "that", "rocks"]);
    });

    it('should return most frequent words', async () => {
        expect(instance).toBeInstanceOf(WordFrequencyAnalyzerHelper);
        const calculateMostFrequentNWords = await instance.getMostFrecuentWordsFromText(sampleText);
        expect(calculateMostFrequentNWords).toBeDefined();
        expect(calculateMostFrequentNWords[0].getWord()).toEqual(sampleWord);
        expect(calculateMostFrequentNWords[0].getFrequency()).toEqual(2);
    });

});
