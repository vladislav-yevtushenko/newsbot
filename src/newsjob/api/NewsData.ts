//https://newsdata.io/api/1/news?apikey=pub_59317e170bd2b505f108b9968c1ed3a611db0&q=Токаев&country=kz,ru&language=kz,ru
const NEWS_DATA_IO_API_KEY = 'pub_59317e170bd2b505f108b9968c1ed3a611db0';

export namespace NewsDataResponse {
    export interface Article {
        article_id: string;
        title: string;
        link: string;
        keywords?: string[];
        video_url?: string;
        image_url: string;
        description: string;
        content: string;
        pubDate: string;
        pubDateTZ: string;
        source_id: string;
        source_priority: number;
        source_name: string;
        source_url: string;
        source_icon: string;
        language: string;
        country: string[];
        category: string[];
    }

    export interface Response {
        status: string;
        totalResults: number;
        results: NewsDataResponse.Article[];
    }
}

export const searchNews = async (keyword: string) => {
    const query = encodeURIComponent(keyword);
    const languages = ['kz', 'ru'];
    const countries = ['kz', 'ru'];

    const url = `https://newsdata.io/api/1/news?apikey=${NEWS_DATA_IO_API_KEY}&q=${query}&country=${countries.join(',')}&language=${languages.join(',')}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.results as NewsDataResponse.Article[];
}
