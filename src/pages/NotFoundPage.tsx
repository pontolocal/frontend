import { Box, Typography, Button, Paper } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',    
                minHeight: '100vh',      
                backgroundColor: '#E4EBFF',
                p: 2, 
            }}
        >

            <Paper
                elevation={8} 
                sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'center',    
                    textAlign: 'center',     
                    width: '100%',
                    maxWidth: '590px',       
                    p: { xs: 3, sm: 5 },     
                }}
            >
            
                <Box
                    component="img"
                    src="../../public/error404.svg"
                    alt="Ilustração de erro 404"
                    sx={{
                        width: 'clamp(180px, 50%, 300px)',
                        mb: 4, 
                    }}
                />
                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 5 }}>
                    Página não encontrada
                </Typography>
                
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1.5 }}>
                    Ops! Parece que você se perdeu no caminho.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                    A página que está procurando não existe ou foi movida.
                </Typography>

                <Button
                    variant="contained"
                    component={Link}
                    to="/" 
                    fullWidth
                    sx={{
                        py: 1.5,
                        fontSize: '1rem',
                        backgroundColor: '#3C5491', 
                        '&:hover': {
                            backgroundColor: '#2a3d6a',
                        },
                        borderRadius: '10px',
                    }}
                >
                    Voltar para a página inicial
                </Button>
            </Paper>
        </Box>
    )
}

export default NotFoundPage