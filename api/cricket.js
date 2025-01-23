import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { matchId } = req.query;

  if (!matchId) {
    return res.status(400).json({ error: 'matchId is required' });
  }

  const apiKey = 'Y03c671f8-cc23-454a-9a6e-e04689145c8e';
  const url = `https://cricapi.com/api/cricket?apikey=${apiKey}&matchId=${matchId}`;

  try {
    const response = await fetch(url);
    const text = await response.text();  // Read the response as text
    
    if (!response.ok) {
      // Log the raw response if it's not ok
      console.error('API response error:', text);
      return res.status(500).json({ error: 'Error fetching match data from CricAPI', details: text });
    }

    const data = JSON.parse(text);  // Attempt to parse the response as JSON
    res.status(200).json(data);

  } catch (error) {
    console.error('Error fetching match data from CricAPI:', error);
    res.status(500).json({ error: 'Error fetching match data from CricAPI' });
  }
}
