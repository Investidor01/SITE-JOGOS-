import { generatePublicRecommendations } from '../../lib/algorithm'

export default function handler(req, res) {
  const data = generatePublicRecommendations()
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
  res.status(200).json(data)
}
