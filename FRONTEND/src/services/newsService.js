import tradingAPI from '../api/client';

export async function getNews(category = 'all') {
  const { data } = await tradingAPI.getNews(category);
  return data;
}

export async function searchNews(query) {
  const { data } = await tradingAPI.searchNews(query);
  return data;
}

export default {
  getNews,
  searchNews
};


