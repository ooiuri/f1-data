import axios from 'axios';

const wikiHost = 'https://en.wikipedia.org/w/';

const apiWiki = axios.create({
  baseURL: wikiHost,
  params: {
    format: 'json',
    origin: '*',
  },
});

export default apiWiki;