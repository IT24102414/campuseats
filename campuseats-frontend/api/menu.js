export default function handler(req, res) {
  // Set CORS headers for cloud deployment
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Dishes matching the Neon PostgreSQL seeded database
  const menuItems = [
    { id: 1, name: "Kottu Roti", price: 750, category: "Mains", available: true },
    { id: 2, name: "Fried Rice", price: 850, category: "Mains", available: true },
    { id: 3, name: "Watalappan", price: 350, category: "Dessert", available: true },
    { id: 4, name: "Veg Sub", price: 600, category: "Snacks", available: false },
    { id: 5, name: "Iced Milo", price: 300, category: "Drinks", available: true }
  ];

  res.status(200).json(menuItems);
}
