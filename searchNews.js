import fetch from "node-fetch";


export async function searchNews(keyword) {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;

    const baseUrl = "https://newsapi.org";
    const apiUrl = "/v2/everything";
    const sortBy = "relevancy";
    const pageSize = 5;
    const query = encodeURIComponent(keyword);

    const url = `${baseUrl}${apiUrl}?q=${query}&apiKey=${NEWS_API_KEY}&sortBy=${sortBy}&pageSize=${pageSize}`;
    console.log("fetching by url: " + url);
    const response = await fetch(url);
    const data = await response.json();
    console.log("response: " + data);
    return data.articles;
}
