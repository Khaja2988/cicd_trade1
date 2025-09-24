import tradingAPI from '../api/client';

export async function buyStock(symbol, quantity) {
  const { data } = await tradingAPI.buyStock(symbol, quantity);
  return data;
}

export async function sellStock(symbol, quantity) {
  const { data } = await tradingAPI.sellStock(symbol, quantity);
  return data;
}

export async function getTransactionHistory() {
  const { data } = await tradingAPI.getTransactionHistory();
  return data;
}

export async function getStockTransactionHistory(symbol) {
  const { data } = await tradingAPI.getStockTransactionHistory(symbol);
  return data;
}

export async function getTradingStats() {
  const { data } = await tradingAPI.getTradingStats();
  return data;
}

export default {
  buyStock,
  sellStock,
  getTransactionHistory,
  getStockTransactionHistory,
  getTradingStats
};


