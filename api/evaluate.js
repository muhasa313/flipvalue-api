export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { search, buy_price, faults, battery } = req.body;

  // ---- TEMP REALISTIC PRICING ENGINE ----
  // (we simulate real UK pricing ranges based on model)

  let basePrice = 0;

  if (search.includes("iPhone 15")) basePrice = 450;
  else if (search.includes("iPhone 14")) basePrice = 380;
  else if (search.includes("iPhone 13")) basePrice = 320;
  else if (search.includes("iPhone 12")) basePrice = 240;
  else basePrice = 200;

  // Adjust for condition
  if (faults && faults.toLowerCase().includes("crack")) basePrice -= 60;
  if (faults && faults.toLowerCase().includes("back")) basePrice -= 40;

  // Battery impact
  if (battery && parseInt(battery) < 85) basePrice -= 20;

  // Estimate resale
  const quickSale = basePrice;
  const low = basePrice - 30;
  const high = basePrice + 40;

  // Repair estimate
  let repair = 0;
  if (faults?.includes("screen")) repair += 120;
  if (faults?.includes("back")) repair += 80;

  // Fees
  const fees = 30;

  const totalCost = buy_price + repair;
  const netSale = quickSale - fees;
  const profit = netSale - totalCost;

  let verdict = "BAD";
  if (profit >= 50) verdict = "GOOD";
  else if (profit >= 25) verdict = "OK";

  const maxBuy = quickSale - fees - repair - 50;

  return res.status(200).json({
    resale_low: low,
    resale_high: high,
    quick_sale: quickSale,
    repair,
    profit,
    verdict,
    max_buy: maxBuy
  });
}
