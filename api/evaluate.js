export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { search, buy_price, faults, battery } = req.body;

  return res.status(200).json({
    ok: true,
    search,
    buy_price,
    faults,
    battery,
    message: "API working"
  });
}
