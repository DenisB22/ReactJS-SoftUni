import * as request from './requester';

const baseUrl = 'http://localhost:3030/jsonstore/dogs';

export const getAll = async () => {
    const result = await request.get(baseUrl);
    const cards = Object.values(result);
    console.log(cards);
    return cards;
};