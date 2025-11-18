# 🌐 Ponto Local

A modern web platform connecting **local merchants** and **consumers** through an intuitive and scalable online marketplace.  
The goal is to **empower small businesses** by providing tools to anounce products, manage orders, and promote their stores locally.

---

## 📌 Objective
This project aims to create a **location-based marketplace** where merchants can register their businesses, list products, and receive orders directly from nearby customers.  
Consumers can **discover local products**, contact local sellers and manager their purchasing and sales. 

---

## ⚙️ Technologies
- **Frontend**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/) + [Material UI](https://mui.com/material-ui/)
- **Routing**: React Router
- **API Communication**: Axios
- **Authentication**: JWT + Social Login
- **Build Tool**: Vite
- **Version Control**: Git + Conventional Commits
- **Database (Backend)**: PostgreSQL (handled by backend)

---

## 📂 Folder Structure
```plaintext
src/
 ├─ api/                  # Funções para comunicação com a API (Axios, fetch, etc.)
 │   ├─ index.ts           # Configuração base (ex: axios.create)
 │   └─ user.service.ts    # Exemplo: serviço de usuários
 │
 ├─ assets/               # Arquivos estáticos (imagens, ícones, fontes)
 │   ├─ images/
 │   ├─ icons/
 │   └─ fonts/
 │
 ├─ components/           # Componentes reutilizáveis
 │   ├─ ui/                # Componentes de UI genéricos (botões, inputs)
 │   ├─ layout/            # Estrutura de layout (Header, Footer, Sidebar)
 │   └─ feedback/         # Alertas, Toasts, Loaders
 │   └─ modal/             # Modais (pop up que parece por cima da página)
 ├─ hooks/                # Hooks customizados
 │   └─ useAuth.ts
 │
 ├─ lib/                  # Utilitários e bibliotecas internas (formatações, máscaras) 
 │   └─ formatDate.ts
 │
 ├─ pages/               
 │   └─ Home.tsx
 │
 ├─ store/                # Gerenciamento de estado (Redux, Zustand, etc.)
 │   └─ userSlice.ts
 │
 ├─ styles/               # Estilos globais do Tailwind
 │   ├─ globals.css
 │   └─ tailwind.css
 │
 ├─ types/                # Tipos TypeScript globais
 │   └─ user.d.ts
 │
 ├─ AppRoutes.tsx
 ├─ App.tsx
 ├─ main.tsx
 └─ vite-env.d.ts / next-env.d.ts

```

## 📜 Functional Requirements (FR)

1. User Registration & Authentication
FR01: Users (merchants and consumers) can register and log in (email/password or social login).

FR02: Merchants must register CNPJ/CPF and business details.

2. Product Management
FR03: Merchants can create, edit, and delete products with images, description and price.

FR04: System validates merchant address (CEP / geolocation).

3. Geolocation
FR05: Only display products within an admin-defined radius (e.g., 30 km) or by city.

FR06: Consumers can filter products by distance or neighborhood.

FR08: Merchants receive notifications of new orders.

4. Reports & Dashboard
FR16: Merchants can access sales reports, best-selling products, etc.

## 🛡 Non-Functional Requirements (NFR)
NFR01: Fully responsive (web + mobile).

NFR02: Secure password encryption (bcrypt) and sensitive data protection.

NFR03: High availability (> 99% uptime).

NFR04: Average response time < 2 seconds.

NFR05: LGPD compliant (personal data).

NFR06: Easy to use, intuitive UX for small merchants.

## 🚀 Future Features
RFUT01: Native mobile app (Android/iOS) for complete store management.

RFUT02: Partnership with delivery companies for real-time shipping calculation.

RFUT03: Public API for inventory system integration.

## 🛠 How to Run Locally
1️⃣ Clone the repository

`git clone https://github.com/joaonevescampos/frontend-ponto-local.git`

`cd frontend-ponto-local`

2️⃣ Install dependencies

`npm install`

or

`yarn install`

3️⃣ Configure environment variables
Create a .env file at the project root.

4️⃣ Run the project

`npm run dev`
or
`yarn dev`

The app will be available at:

http://localhost:5173

## 👥 Contributing

- Fork the repository

- Create a new branch (feature/my-feature)

- Commit your changes (feat: add new feature)

- Push to the branch

- Open a Pull Request

## 📄 License
This project is licensed under the MIT License — see the LICENSE file for details.

## Authors

- [João Victor Neves Campos de Jesus](https://github.com/joaonevescampos)
- [Jones Marcio Nambundo](https://github.com/jonesnambundo)
- [Gabriel Nascimento da Silva](https://github.com/devgabrielnascimento)
- [Cauã Gonçalves Melgarejo](https://github.com/CauaMelgarejo)
- [Jakeline da Silva Melo](https://github.com/jakemello)