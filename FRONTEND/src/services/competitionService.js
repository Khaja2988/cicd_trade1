import tradingAPI from '../api/client';

export async function getCompetitions(status = 'all') {
  const { data } = await tradingAPI.getCompetitions(status);
  return data;
}

export async function joinCompetition(competitionId) {
  const { data } = await tradingAPI.joinCompetition(competitionId);
  return data;
}

export async function createCompetition(payload) {
  const { data } = await tradingAPI.createCompetition(payload);
  return data;
}

export default {
  getCompetitions,
  joinCompetition,
  createCompetition
};


