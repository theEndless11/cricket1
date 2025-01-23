const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { matchId } = req.query;

  if (!matchId) {
    return res.status(400).json({ error: 'matchId is required' });
  }

  const apiKey = 'Y03c671f8-cc23-454a-9a6e-e04689145c8e';
  const url = `https://cricapi.com/api/cricket?apikey=${apiKey}&matchId=${matchId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'No live match data available' });
    }
  } catch (error) {
    console.error('Error fetching match data from CricAPI:', error);
    res.status(500).json({ error: 'Error fetching match data from CricAPI' });
  }
};
