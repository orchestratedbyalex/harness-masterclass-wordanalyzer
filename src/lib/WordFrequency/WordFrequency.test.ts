import { WordFrequency } from ".";

describe('WordFrequency', () => {
    let instance: WordFrequency;
    let wrongInstance: WordFrequency;
    let sampleText: string = "this is the text, ThE one that rocks";
    let sampleWord: string = "The";
    let wordThatDoesNotExist: string = "Nonexistent";

    beforeEach(() => {
        instance = new WordFrequency(sampleText, sampleWord);
        wrongInstance = new WordFrequency(sampleText, wordThatDoesNotExist);
    });

    it('calculate frecuency of existing word', async () => {
        expect(instance).toBeInstanceOf(WordFrequency);
        const frecuencyForWord = await instance.getFrequency();
        expect(frecuencyForWord).toBeDefined();
        expect(frecuencyForWord).toEqual(2);
    });

    it('calculate frecuency of non existing word', async () => {
        expect(wrongInstance).toBeInstanceOf(WordFrequency);
        const frecuencyForWord = await wrongInstance.getFrequency();
        expect(frecuencyForWord).toBeDefined();
        expect(frecuencyForWord).toEqual(0);
    });

});
