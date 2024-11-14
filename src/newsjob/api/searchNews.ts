import NewsAPI from 'ts-newsapi';

export const searchNews = async (keyword: string) => {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;

    const sortBy = "relevancy";
    const pageSize = 5;
    const query = encodeURIComponent(keyword);

    const newsapi = new NewsAPI(NEWS_API_KEY!);
    const headlines = await newsapi.getEverything({
        q: query,
        sortBy: sortBy,
        pageSize: pageSize
    })

    return headlines.articles;

};
