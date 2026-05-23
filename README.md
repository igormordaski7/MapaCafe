# Mapa Café

Aplicação distribuída para cadastro e gerenciamento de cafeterias, publicada em nuvem pública como trabalho da disciplina de DevOps.

## Arquitetura

- Frontend: React publicado na Vercel
- Backend: .NET 8 publicado no Render com Docker
- Banco de dados: PostgreSQL no Supabase
- Versionamento: GitHub
- CI/CD: GitHub, Vercel, Render e GitHub Actions

## Links

Frontend:
https://mapa-cafe.vercel.app

Backend / Swagger:
https://mapacafe.onrender.com/swagger

Health Check:
https://mapacafe.onrender.com/health

Banco:
Supabase PostgreSQL

## Premissas DevOps aplicadas

- Versionamento com GitHub
- CI com GitHub Actions
- Deploy automático no Vercel e Render
- Backend containerizado com Docker
- Configuração por variáveis de ambiente
- Health checks da API e banco
- Banco gerenciado em nuvem
- Separação entre frontend, backend e banco
- Logs disponíveis nas plataformas de nuvem

## Arquitetura resumida

Usuário → Vercel React → Render .NET API em Docker → Supabase PostgreSQL