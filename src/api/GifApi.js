import GphApiClient from 'giphy-js-sdk-core';

const client = GphApiClient('qmoW8DTkT7IUUbiGqQmnggsc3kilMDC4');

const searchGifs = async (q = "", limit = 12, offset = 0) => {
    return await client.search('gifs', {q, limit, offset});
};

export {searchGifs};