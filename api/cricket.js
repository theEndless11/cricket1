import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { matchId } = req.query;

  if (!matchId) {
    return res.status(400).json({ error: 'matchId is required' });
  }

  const apiKey = '03c671f8-cc23-454a-9a6e-e04689145c8e';  // Replace with your actual CricAPI key
  const url = https://cricapi.com/api/cricket?apikey=${apiKey}&matchId=${matchId};

  try {
    const response = await fetch(url);

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();  // Read the response as text
      console.error('Expected JSON, but got:', text);
      return res.status(500).json({ error: 'Expected JSON, but got non-JSON response', details: text });
    }

    const data = await response.json();  // Parse JSON if the response is correct
    if (!data || data.error) {
      console.error('API response error:', data?.error || 'Unknown error');
      return res.status(500).json({ error: 'Error fetching match data from CricAPI', details: data?.error || 'Unknown error' });
    }

    res.status(200).json(data);  // Return the live match data

  } catch (error) {
    console.error('Error fetching match data from CricAPI:', error);
    return res.status(500).json({ error: 'Error fetching match data from CricAPI', details: error.message });
  }
}
