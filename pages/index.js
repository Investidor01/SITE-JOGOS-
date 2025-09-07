import { useEffect, useState } from 'react'

export default function Home() {
  const [publicData, setPublicData] = useState(null)
  const [paidData, setPaidData] = useState(null)
  const [loadingPaid, setLoadingPaid] = useState(false)

  useEffect(() => {
    fetch('/api/public-recommendations')
      .then(res => res.json())
      .then(setPublicData)
  }, [])

  const fetchPaid = async () => {
    setLoadingPaid(true)
    const res = await fetch(`/api/generate?key=${process.env.NEXT_PUBLIC_PAID_KEY || ''}`)
    const data = await res.json()
    setPaidData(data)
    setLoadingPaid(false)
  }

  const shareSite = () => {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({ title: 'SmartPlay', url })
    } else {
      navigator.clipboard.writeText(url)
      alert('Link do site copiado!')
    }
  }

  const shareList = (data) => {
    const url = window.location.href
    const text = `🎰 Melhores jogos: ${data.bestGames.map(g => g.name).join(', ')} | Horários: ${data.bestTimes.join(', ')} - Confira em ${url}`
    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/?text=${encoded}`, '_blank')
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🎰 SmartPlay Casino Insights</h1>

      <section className="bg-gray-900 p-4 rounded-xl shadow-lg mb-6 w-full max-w-2xl">
        <h2 className="text-xl mb-2">🔥 Horários e Jogos Grátis</h2>
        {publicData ? (
          <div>
            <p><b>Gerado em:</b> {new Date(publicData.generatedAt).toLocaleString()}</p>
            <ul className="list-disc ml-6 mt-2">
              {publicData.bestGames.map((g, i) => <li key={i}>{g.name}</li>)}
            </ul>
            <p className="mt-2"><b>Melhores horários:</b> {publicData.bestTimes.join(', ')}</p>

            <button onClick={() => shareList(publicData)} className="mt-3 px-3 py-1 bg-green-500 rounded">
              Compartilhar Lista (WhatsApp)
            </button>
          </div>
        ) : <p>Carregando...</p>}
      </section>

      <section className="bg-gray-900 p-4 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-xl mb-2">💎 Gerador Premium</h2>
        <p className="mb-2">Pague R$5 e desbloqueie horários exclusivos todos os dias.</p>
        <button
          onClick={fetchPaid}
          disabled={loadingPaid}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
        >
          {loadingPaid ? "Gerando..." : "Gerar Lista Premium"}
        </button>

        {paidData && !paidData.error && (
          <div className="mt-4">
            <p><b>Gerado em:</b> {new Date(paidData.generatedAt).toLocaleString()}</p>
            <ul className="list-disc ml-6 mt-2">
              {paidData.bestGames.map((g, i) => <li key={i}>{g.name}</li>)}
            </ul>
            <p className="mt-2"><b>Melhores horários:</b> {paidData.bestTimes.join(', ')}</p>

            <button onClick={() => shareList(paidData)} className="mt-3 px-3 py-1 bg-green-500 rounded">
              Compartilhar Lista (WhatsApp)
            </button>
          </div>
        )}

        {paidData?.error && <p className="text-red-500 mt-2">{paidData.error}</p>}
      </section>

      <button onClick={shareSite} className="mt-6 px-4 py-2 bg-blue-500 rounded-lg">
        Compartilhar Site 🔗
      </button>
    </div>
  )
}
