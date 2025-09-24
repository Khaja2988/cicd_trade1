import tradingAPI from '../api/client';

export async function getStocks() {
  const { data } = await tradingAPI.getStocks();
  return data;
}

export async function getStockBySymbol(symbol) {
  const { data } = await tradingAPI.getStockBySymbol(symbol);
  return data;
}

export async function searchStocks(query) {
  const { data } = await tradingAPI.searchStocks(query);
  return data;
}

export async function getStocksBySector(sector) {
  const { data } = await tradingAPI.getStocksBySector(sector);
  return data;
}

export async function getMarketIndices() {
  const { data } = await tradingAPI.getMarketIndices();
  return data;
}

export async function getStockChart(symbol, timeframe) {
  const { data } = await tradingAPI.getStockChart(symbol, timeframe);
  return data;
}

export default {
  getStocks,
  getStockBySymbol,
  searchStocks,
  getStocksBySector,
  getMarketIndices,
  getStockChart
};


