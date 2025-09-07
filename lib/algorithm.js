import crypto from 'crypto'

const games = [
  { name: "Roleta Europeia", image: "/images/roleta.jpg" },
  { name: "Blackjack VIP", image: "/images/blackjack.jpg" },
  { name: "Caça-níqueis Fortune", image: "/images/slots.jpg" },
  { name: "Poker Texas Hold'em", image: "/images/poker.jpg" }
]

function randomTimes(count = 5) {
  const times = new Set()
  while (times.size < count) {
    const hour = Math.floor(Math.random() * 24)
    const minute = Math.floor(Math.random() * 60)
    times.add(`${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}`)
  }
  return Array.from(times)
}

export function generatePublicRecommendations() {
  return {
    generatedAt: new Date().toISOString(),
    bestGames: games.sort(() => 0.5 - Math.random()).slice(0, 2),
    bestTimes: randomTimes(3)
  }
}

export function generatePaidRecommendations(secretKey) {
  const today = new Date().toISOString().slice(0, 10)
  const hmac = crypto.createHmac('sha256', secretKey)
  hmac.update(today)
  const seed = hmac.digest('hex')

  const random = (max) => {
    const hash = crypto.createHash('sha256').update(seed + Math.random()).digest('hex')
    return parseInt(hash.slice(0, 8), 16) % max
  }

  const bestGames = []
  const shuffled = [...games]
  while (bestGames.length < 3) {
    const idx = random(shuffled.length)
    bestGames.push(shuffled.splice(idx, 1)[0])
  }

  const times = new Set()
  while (times.size < 5) {
    const hour = random(24)
    const minute = random(60)
    times.add(`${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}`)
  }

  return {
    generatedAt: new Date().toISOString(),
    bestGames,
    bestTimes: Array.from(times)
  }
                     }
