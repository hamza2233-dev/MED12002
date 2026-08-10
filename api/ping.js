export default async function handler(req, res) {
  const caller_number = req.query.caller_number || (req.body && req.body.caller_number);

  if (!caller_number) {
    return res.status(400).json({ error: 'Missing caller_number parameter' });
  }

  const apiKey = '443bcb0a-9e2f-48b3-bb18-42e1416b92f4';
  const targetUrl = `https://rtb.retreaver.com/rtbs.json`;
  
  const params = new URLSearchParams();
  params.append('key', apiKey);
  params.append('caller_number', caller_number);

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      body: params
    });

    const data = await response.text();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(data);
  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({ error: error.message });
  }
}
