// jest mock function
import {afterEach, beforeEach, describe, expect, it, jest} from "@jest/globals";
import {searchNews} from './searchNews';
import nock from "nock";


describe('searchNews', () => {
// Backup original process.env
    const ENV = process.env;
    beforeEach(() => {
        jest.resetModules();
        process.env = {...ENV, NEWS_API_KEY: 'TEST_KEY'};

        nock('https://newsapi.org', {
            reqheaders: {
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'user-agent': 'node-fetch',
            }
        })
            .get('/v2/everything')
            .query(queryObject => {
                return queryObject.apiKey === 'TEST_KEY' &&
                    queryObject.q === 'test' &&
                    queryObject.sortBy === 'relevancy' &&
                    queryObject.pageSize > 0;
            })
            .reply(200, {
                articles: [
                    {
                        source: {id: 'bbc-news', name: 'BBC News'},
                        author: 'BBC News',
                        title: 'My Test News Title',
                        description: 'Test news description',
                        url: 'http://www.bbc.co.uk/news/business-60257129',
                        urlToImage: 'https://ichef.bbci.co.uk/news/1024/branded_news/13F1A/production/_120604224_gettyimages-1235254648.jpg',
                        publishedAt: '2022-02-23T20:06:04Z',
                        content: 'Test content'
                    }
                ]
            });
    });

    afterEach(() => {
        // Restore original process.env
        process.env = ENV;
        nock.cleanAll();
    });

    it('returns articles related to keyword', async () => {
        const result = await searchNews('test');
        expect(result.length).toBe(1);
        expect(result[0].title).toEqual('My Test News Title');
    });
});
