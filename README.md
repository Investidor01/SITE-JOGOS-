# SmartPlay — Vercel ready (demo)

Projeto demo com frontend Next.js + API routes para gerar recomendações públicas a cada hora e um gerador diário pago (simulado).

## Como usar localmente
1. `npm install`
2. Copie `.env.example` para `.env` e defina `SECRET_KEY` e `PAID_KEY`.
3. `npm run dev`

## Deploy na Vercel
1. Faça `git init` / commit e importe para Vercel.
2. Defina as variáveis de ambiente no painel Vercel:
   - `SECRET_KEY` — segredo HMAC
   - `PAID_KEY` — chave para simular pagamento
3. Deploy 🚀
