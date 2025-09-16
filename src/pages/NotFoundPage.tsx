import { Box, Typography, Button, Paper } from '@mui/material'
import { Link } from 'react-router-dom'

// Defines the functional component for the 404 Not Found page.
const NotFoundPage = () => {
    return (
        // Main container Box that covers the entire viewport.
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Horizontally centers the content.
                alignItems: 'center',    // Vertically centers the content.
                minHeight: '100vh',      // Ensures the container takes up at least the full viewport height.
                backgroundColor: '#E4EBFF',
                p: 2, // Adds padding on all sides.
            }}
        >
            {/* Paper component from MUI, used as a styled card to contain the 404 message. */}
            <Paper
                elevation={8} // Adds a shadow effect to give the card depth.
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // Stacks child elements vertically.
                    alignItems: 'center',    // Centers items horizontally within the card.
                    textAlign: 'center',     // Centers the text content.
                    width: '100%',
                    maxWidth: '590px',       // Prevents the card from becoming too wide on large screens.
                    p: { xs: 3, sm: 5 },     // Responsive padding: smaller on extra-small screens, larger on small screens and up.
                }}
            >
                {/* An MUI Box used as an <img> tag to display the 404 illustration. */}
                <Box
                    component="img"
                    src="/images/error404.svg"
                    alt="Ilustração de erro 404"
                    sx={{
                        // Responsive styling for the image width using clamp().
                        // It ensures the width is fluid between a min (180px) and max (300px) value.
                        width: 'clamp(180px, 50%, 300px)',
                        mb: 4, // Margin bottom for spacing.
                    }}
                />
                {/* Main heading for the page. */}
                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 5 }}>
                    Página não encontrada
                </Typography>
                
                {/* Secondary text providing a user-friendly message. */}
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1.5 }}>
                    Ops! Parece que você se perdeu no caminho.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                    A página que está procurando não existe ou foi movida.
                </Typography>

                {/* A Call-to-Action button that navigates the user back to the homepage. */}
                <Button
                    variant="contained"
                    // Integrates react-router's Link functionality into the MUI Button.
                    component={Link}
                    to="/" // The destination path when the button is clicked.
                    fullWidth // Makes the button take up the full width of its container.
                    sx={{
                        py: 1.5, // Vertical padding.
                        fontSize: '1rem',
                        backgroundColor: '#3C5491', 
                        // Style override for the button's hover state.
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