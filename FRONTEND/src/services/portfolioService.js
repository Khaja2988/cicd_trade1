import tradingAPI from '../api/client';

export async function getPortfolio() {
  const { data } = await tradingAPI.getPortfolio();
  return data;
}

export async function getPortfolioValue() {
  const { data } = await tradingAPI.getPortfolioValue();
  return data;
}

export async function updatePortfolioValues() {
  const { data } = await tradingAPI.updatePortfolioValues();
  return data;
}

export default {
  getPortfolio,
  getPortfolioValue,
  updatePortfolioValues
};


