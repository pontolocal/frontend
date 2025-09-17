import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import StorefrontIcon from '@mui/icons-material/Storefront'
import ContactsIcon from '@mui/icons-material/Contacts'
import DashboardIcon from '@mui/icons-material/Dashboard'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FactoryIcon from '@mui/icons-material/Factory'
import ApartmentIcon from '@mui/icons-material/Apartment'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'

const Hero = () => (
  <section className="bg-gradient-to-b from-[#728CCC] to-[#C2D2FC] py-20 pt-40 text-center text-[#1D2333]">
    <div className="container mx-auto px-6">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Compre do Comércio Local
      </h1>
      <p className="text-lg mt-4 max-w-2xl mx-auto">
        Conecte-se com <span className="font-bold">lojas</span>, <span className="font-bold">artesãos</span> e <span className="font-bold">produtores</span> em sua cidade
      </p>
      <Button
        component={RouterLink}
        to="/signup"
        variant="contained"
        size="large"
        sx={{
          marginTop: '2rem',
          padding: '12px 32px',
          fontSize: '1.125rem',
          backgroundColor: '#3C5491',
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: '#314679'
          }
        }}
      >
        Quero começar
      </Button>
    </div>
  </section>
)

const Features = () => (
    <section className="bg-gradient-to-b from-[#C2D2FC] to-white pb-20 -mt-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-[0px_0px_20px_rgba(114,140,204,0.4)] text-center transform transition duration-300 hover:scale-105 cursor-pointer">
                <StorefrontIcon sx={{ fontSize: 60, color: '#728CCC', marginBottom: 2 }} />
                <h3 className="text-xl font-bold text-[#1D2333]">Lojas Locais</h3>
                <p className="text-gray-600 mt-2">Conheça negócios próximos do seu bairro</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-[0px_0px_20px_rgba(114,140,204,0.4)] text-center transform transition duration-300 hover:scale-105 cursor-pointer">
                <ContactsIcon sx={{ fontSize: 60, color: '#728CCC', marginBottom: 2 }} />
                <h3 className="text-xl font-bold text-[#1D2333]">Contato com vendedores</h3>
                <p className="text-gray-600 mt-2">Entre em contato com vendedores próximos a você</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-[0px_0px_20px_rgba(114,140,204,0.4)] text-center transform transition duration-300 hover:scale-105 cursor-pointer">
                <DashboardIcon sx={{ fontSize: 60, color: '#728CCC', marginBottom: 2 }} />
                <h3 className="text-xl font-bold text-[#1D2333]">Dashboard de vendas e compras</h3>
                <p className="text-gray-600 mt-2">Gerencie facilmente suas vendas e compras.</p>
            </div>
        </div>
    </section>
)

const HowItWorks = () => (
  <section id="how-it-works" className="py-5 bg-white text-[#1D2333]">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold mb-2">Como Funciona</h2>
      <p className="text-gray-600 mb-12">Uma plataforma simples e eficiente para conectar sua comunidade</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-[0px_0px_20px_rgba(114,140,204,0.4)] flex flex-col items-center">
          <ApartmentIcon sx={{ fontSize: 60, color: '#728CCC', marginBottom: 2 }} />
          <h3 className="text-xl font-bold mt-4">Comerciantes</h3>
          <p className="text-gray-600 mt-2">Cadastre sua loja grátis e comece a anunciar seus produtos.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-[0px_0px_20px_rgba(114,140,204,0.4)] flex flex-col items-center">
          <PersonOutlineIcon sx={{ fontSize: 60, color: '#728CCC', marginBottom: 2 }} />
          <h3 className="text-xl font-bold mt-4">Consumidores</h3>
          <p className="text-gray-600 mt-2">Descubra produtos únicos no seu bairro ou cidade.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-[0px_0px_20px_rgba(114,140,204,0.4)] flex flex-col items-center">
          <LocationOnOutlinedIcon sx={{ fontSize: 60, color: '#728CCC', marginBottom: 2 }} />
          <h3 className="text-xl font-bold mt-4">Geolocalização</h3>
          <p className="text-gray-600 mt-2">Defina um raio de distância para encontrar produtos próximos.</p>
        </div>
      </div>
    </div>
  </section>
)


const Benefits = () => (
    <section id="benefits" className="py-20 bg-gray-50 text-[#1D2333]">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Quais benefícios da Plataforma Local?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="flex items-start space-x-4">
                    <CheckCircleOutlineIcon sx={{ fontSize: 24, color: '#728CCC', marginTop: 0.5 }} />
                    <div>
                        <h3 className="font-bold">Fortaleça o comércio e empregos na sua cidade</h3>
                        <p className="text-gray-600">Cada compra local gera empregos e movimenta a economia da sua região</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <CheckCircleOutlineIcon sx={{ fontSize: 24, color: '#728CCC', marginTop: 0.5 }} />
                    <div>
                        <h3 className="font-bold">Divulgue seu produto gratuitamente e tenha mais clientes</h3>
                        <p className="text-gray-600">Mantenha contato direto com vendedores e clientes da sua cidade</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <CheckCircleOutlineIcon sx={{ fontSize: 24, color: '#728CCC', marginTop: 0.5 }} />
                    <div>
                        <h3 className="font-bold">Acesse produtos do seu bairro</h3>
                        <p className="text-gray-600">Descubra itens que você não encontra em grandes redes.</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <CheckCircleOutlineIcon sx={{ fontSize: 24, color: '#728CCC', marginTop: 0.5 }} />
                    <div>
                        <h3 className="font-bold">Tenha um dashboard completo para gerenciar suas vendas</h3>
                        <p className="text-gray-600">Tenha acesso a um dashboard e organize suas vendas e compras na plataforma.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

const FindStores = () => (
    <section className="py-5 bg-[#F8F8F8] text-[#1D2333]">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4">Encontre Lojas próximas</h2>
            <p className="text-gray-600 text-center mb-12">Do artesanato à gastronomia, descubra o que só existe perto de você</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-[0px_0px_20px_rgba(114,140,204,0.4)] flex flex-col items-center text-center transform transition duration-300 hover:scale-105 cursor-pointer">
                    <div className="bg-[#E4EBFF] p-4 rounded-full mb-4">
                        <FactoryIcon sx={{ fontSize: 50, color: '#728CCC' }} />
                    </div>
                    <h3 className="text-lg font-bold">Mercadinho Central</h3>
                    <p className="text-gray-500 text-sm">Hortifruti e Mercearia</p>
                    <p className="text-gray-700 text-sm mt-4">Produtos frescos e de qualidade, há 15 anos servindo a comunidade.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-[0px_0px_20px_rgba(114,140,204,0.4)] flex flex-col items-center text-center transform transition duration-300 hover:scale-105 cursor-pointer">
                    <div className="bg-[#E4EBFF] p-4 rounded-full mb-4">
                        <FactoryIcon sx={{ fontSize: 50, color: '#728CCC' }} />
                    </div>
                    <h3 className="text-lg font-bold">Apiário São José</h3>
                    <p className="text-gray-500 text-sm">Apicultura</p>
                    <p className="text-gray-700 text-sm mt-4">O Apiário São José é um produtor de mel 100% natural e nutritivo, sem adição de conservantes ou açúcares.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-[0px_0px_20px_rgba(114,140,204,0.4)] flex flex-col items-center text-center transform transition duration-300 hover:scale-105 cursor-pointer">
                    <div className="bg-[#E4EBFF] p-4 rounded-full mb-4">
                        <FactoryIcon sx={{ fontSize: 50, color: '#728CCC' }} />
                    </div>
                    <h3 className="text-lg font-bold">Doceria da Luna</h3>
                    <p className="text-gray-500 text-sm">Doceria e Confeitaria</p>
                    <p className="text-gray-700 text-sm mt-4">Oferece doces feitos com ingredientes selecionados e muito carinho.</p>
                </div>
            </div>
        </div>
    </section>
)


const CallToAction = () => (
  <section id="contact" className="bg-[#728CCC] text-white">
    <div className="container mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-bold">Pronto para fortalecer o comércio local?</h2>
      <p className="mt-4 mb-8 max-w-2xl mx-auto">
        Junte-se à nossa comunidade e faça parte da transformação do comércio na sua cidade.
      </p>
      <Button
        component={RouterLink}
        to="/signup"
        variant="contained"
        size="large"
        sx={{
          backgroundColor: 'white',
          color: '#1D2333',
          padding: '12px 32px',
          fontSize: '1.125rem',
          borderRadius: '10px',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#f0f0f0'
          }
        }}
      >
        Cadastre-se gratuitamente
      </Button>
    </div>
  </section>
)

const LandingPage = () => {
  return (
    <main className="bg-white">
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <FindStores />
      <CallToAction />
    </main>
  )
}

export default LandingPage