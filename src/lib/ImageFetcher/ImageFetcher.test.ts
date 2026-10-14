import { ImageFetcher } from ".";

describe('ImageFetcher', () => {
    const originalApiKey = process.env.REACT_APP_PIXABAY_API_KEY;
    let fetchMock: jest.Mock;

    beforeEach(() => {
        fetchMock = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ hits: [] }),
        }));
        window.fetch = fetchMock as any;
    });

    afterEach(() => {
        if (originalApiKey === undefined) {
            delete process.env.REACT_APP_PIXABAY_API_KEY;
        } else {
            process.env.REACT_APP_PIXABAY_API_KEY = originalApiKey;
        }
    });

    it('returns no images without a request when no API key is configured', async () => {
        delete process.env.REACT_APP_PIXABAY_API_KEY;

        const response = await new ImageFetcher().fetchImageFromWord('apple');

        expect(response).toEqual({ hits: [] });
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('requests images with the API key from the environment', async () => {
        process.env.REACT_APP_PIXABAY_API_KEY = 'test-key';

        await new ImageFetcher().fetchImageFromWord('apple');

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0][0]).toContain('key=test-key');
        expect(fetchMock.mock.calls[0][0]).toContain('q=apple');
    });
});
