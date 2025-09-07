import { generatePaidRecommendations } from '../../lib/algorithm'

export default function handler(req, res) {
  const { key } = req.query
  if (key !== process.env.PAID_KEY) {
    return res.status(403).json({ error: "Acesso negado. Forneça a chave correta." })
  }
  const data = generatePaidRecommendations(process.env.SECRET_KEY)
  res.status(200).json(data)
}
