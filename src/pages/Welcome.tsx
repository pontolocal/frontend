import { Card, Typography, Button, Box, useTheme } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

// Agurdando os components de Navbar e SideBar

const Welcome = () => {
  const theme = useTheme()

  const handleStartSelling = () => {
    console.log("Ao clicar no botão 'Começar a divulgar' vai redirecionar para /products/new?")
  }

  const handleNotNow = () => {
    console.log("Ao clicar no botão 'Agora Não' vai redirecionar para /dashboard?")
  }

  const SUCCESS_COLOR_FROM_THEME = theme.palette.success.main

  return (
    <Box
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Card
        className="w-full max-w-4xl p-6 sm:p-10 text-center shadow-lg"
      >
        <Typography
          variant="h4"
          component="h1"
          className="font-bold"
          sx={{ color: theme.palette.text.primary, fontSize: '2.25rem', mb: 4 }}
        >
          Quer vender?
        </Typography>
        <Typography
          variant="body1"
          className="mt-2"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Venha divulgar os seus produtos e alcançar mais pessoas da sua região
        </Typography>

        <Box
          className="flex flex-col md:flex-row items-center justify-center gap-8"
          sx={{ mb: 6 }}
        >
          <Box
            className="flex-shrink-0 flex justify-center w-full md:w-5/12"
          >
            <Box
              sx={{
                width: 300,
                height: 300,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.02)'
              }}
            >
              <img
                src="/src/assets/images/WelcomeIcon.png"
                alt="Ilustração de uma loja virtual"
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </Box>
          </Box>

          <Box
            className="flex flex-col gap-9 w-full md:w-7/12"
            sx={{
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.infoBox.main,
                borderRadius: '10px',
                padding: '35px 35px',
                margin: { xs: '0 auto', md: '0' },
                maxWidth: { xs: 300, md: '95%' }
              }}
            >
              <Typography
                variant="subtitle1"
                component="p"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.infoBox.contrastText,
                  fontSize: '1rem',
                  mb: 3.5
                }}
              >
                Você ainda não publicou nenhum produto
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mt-1"
                sx={{
                  fontWeight: 'normal',
                  color: theme.palette.infoBox.contrastText
                }}
              >
                Comece agora a divulgar e aumente sua visibilidade
              </Typography>
            </Box>

            <ul className="space-y-2 mt-2" style={{ listStyle: 'none', padding: 0 }}>
              <li className="flex items-center gap-3 justify-start">
                <CheckCircleOutlineIcon style={{ color: SUCCESS_COLOR_FROM_THEME }} />
                <Typography variant="body1" color="text.primary">Alcance pessoas da sua região</Typography>
              </li>
              <li className="flex items-center gap-3 justify-start">
                <CheckCircleOutlineIcon style={{ color: SUCCESS_COLOR_FROM_THEME }} />
                <Typography variant="body1" color="text.primary">Publicação rápida e fácil</Typography>
              </li>
              <li className="flex items-center gap-3 justify-start">
                <CheckCircleOutlineIcon style={{ color: SUCCESS_COLOR_FROM_THEME }} />
                <Typography variant="body1" color="text.primary">Totalmente gratuito</Typography>
              </li>
            </ul>
          </Box>
        </Box>

        <Box
          className="flex flex-col items-center gap-4"
          sx={{ pt: 3 }}
        >
          <Box className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-40 w-full sm:w-auto">
            <Button
              variant="outlined"
              color="primary"
              className="normal-case px-6"
              onClick={handleNotNow}
              sx={{
                color: theme.palette.primary.main,
                minWidth: 247,
                fontWeight: 'bold',
                borderWidth: '1px',
                paddingY: '12px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  borderColor: theme.palette.primary.main,
                  boxShadow: 'none'
                }
              }}
            >
              Agora não
            </Button>
            <Button
              variant="contained"
              className="normal-case px-6 shadow-md"
              onClick={handleStartSelling}
              color="primary"
              sx={{
                minWidth: 247,
                fontWeight: 'bold',
                paddingY: '12px',
                boxShadow: `0 4px 6px -1px ${theme.palette.primary.main}50, 0 2px 4px -2px ${theme.palette.primary.main}50`,
                '&:hover': {
                  boxShadow: `0 6px 8px -1px ${theme.palette.primary.main}70, 0 4px 6px -3px ${theme.palette.primary.main}70`
                }
              }}
            >
              Começar a Divulgar
            </Button>
          </Box>

          <a
            href="/faq"
            className="text-sm hover:underline mt-2"
            style={{
              fontSize: theme.typography.body2.fontSize,
              color: theme.palette.text.secondary
            }}
          >
            Precisa de ajuda? Veja nosso guia
          </a>
        </Box>

      </Card>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 6,
          textAlign: 'center'
        }}
      >
        Junte-se a milhares de vendedores que já estão crescendo conosco! 🚀
      </Typography>
    </Box>
  )
}

export default Welcome