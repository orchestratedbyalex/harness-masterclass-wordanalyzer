export class ImageFetcher {

    private API: string = 'https://pixabay.com/api/';

    public fetchImageFromWord = async (word: string): Promise<any> => {
        // the key is only set locally (.env.local); without it, skip the image
        const apiKey = process.env.REACT_APP_PIXABAY_API_KEY;
        if (!apiKey) {
            return { hits: [] };
        }

        let response  = await fetch(this.API+"?key="+apiKey+"&q="+word+"&image_type=photo&pretty=true")
            .then(response => response.json())
            .catch(error => error);

        return response;
    }

}
