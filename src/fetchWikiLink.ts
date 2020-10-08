import axios from 'axios';
import jsdom from 'jsdom';

const fetchWikiLink = async (callback: (link: string) => void) => {
    const response = await axios.get(
        'https://en.wikipedia.org/wiki/Special:Random'
    );
    const { JSDOM } = jsdom;
    const page = new JSDOM(response.data);
    const { document } = page.window;
    const heading = document.querySelector('#firstHeading');
    if (heading) {
        const route = heading.textContent?.replace(/ +/g, '_');
        const link = `https://wikipedia.org/wiki/${route}`;
        callback(link);
    }
};

export default fetchWikiLink;
