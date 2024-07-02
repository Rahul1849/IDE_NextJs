export default function handler(req, res) {
    if (req.method === 'POST') {
      const { code } = req.body;
      try {
        const result = eval(code); 
        res.status(200).json({ output: String(result) });
      } catch (error) {
        res.status(500).json({ output: String(error) });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  