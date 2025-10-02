import { Dialog, DialogContent, DialogActions, Button, Typography, useTheme, useMediaQuery } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

interface ReviewSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onStartSelling: () => void
  onExploreProducts: () => void
}

export const ReviewSuccessModal = ({
  isOpen,
  onClose,
  onStartSelling,
  onExploreProducts,
}: ReviewSuccessModalProps) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      PaperProps={{ 
        sx: { 
          borderRadius: 4, 
          padding: { xs: 2, sm: 3 },
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
          alignItems: 'center',
        } 
      }}
    >
      <CheckCircleOutlineIcon 
        sx={{ 
          fontSize: isMobile ? 48 : 56, 
          color: 'success.main',
          marginBottom: 2,
        }} 
      />
      
      <DialogContent sx={{ padding: '0 !important' }}>
        <Typography 
          variant={isMobile ? 'h6' : 'h5'} 
          component="h2" 
          sx={{ fontWeight: 'bold' }}
        >
          Obrigado por avaliar o produto!
        </Typography>
        <Typography 
          variant={isMobile ? 'body2' : 'body1'} 
          color="text.secondary" 
          sx={{ marginTop: 1,
            fontWeight: 'bold'
          }}
        >
          Espero que esteja gostando da experiência.
        </Typography>
        <Typography 
          variant={isMobile ? 'body1' : 'h6'}
          color="text.secondary" 
          sx={{ 
            marginTop: 4, 
            marginBottom: 2,  
            fontWeight: 'bold'
        }}
        >
          Quer continuar explorando os produtos?
        </Typography>
      </DialogContent>
      
      <DialogActions 
        sx={{ 
          padding: '16px 0 0 0', 
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1.5,
        }}
      >
        <Button 
          onClick={onStartSelling} 
          variant="contained" 
          color="primary" 
          sx={{ 
            width: { xs: '100%', sm: 'auto' },
            flexGrow: 1,
            textTransform: 'none', 
            fontWeight: 'bold',
            borderRadius: 2,
            padding:'10px 16px',
          }}
        >
          Começar a vender
        </Button>
        <Button 
          onClick={onExploreProducts} 
          variant="outlined" 
          color="primary" 
          sx={{ 
            width: { xs: '100%', sm: 'auto' },
            flexGrow: 1,
            textTransform: 'none', 
            fontWeight: 'bold',
            borderRadius: 2,
            padding: '10px 16px',
            '&:hover': {
              backgroundColor: 'var(--color-orange-pale-2)'
            }
          }}
        >
          Explorar produtos
        </Button>
      </DialogActions>
    </Dialog>
  )
}