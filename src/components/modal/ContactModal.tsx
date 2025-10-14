import { Dialog, DialogContent, DialogActions, Button, Typography, Box, Stack } from '@mui/material'
import emailIcon from '../../assets/images/email-icon.png'
import whatsappIcon from '../../assets/images/whatsapp-icon.png'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: { xs: 2, sm: 3 },
          width: '100%',
          maxWidth: '400px',
          alignItems: 'center',
        },
      }}
    >
      <DialogContent sx={{ 
        width: '100%', 
        textAlign: 'center' 
        }}>
        <Typography variant="h5" component="h2" sx={{ 
            fontWeight: 'bold' 
            }}>
          Fale Conosco
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ 
            mt: 1, 
            mb: 3 
            }}>
          Estamos aqui para ajudar você!
        </Typography>

        <Stack spacing={2}>
          <Box
            component="a"
            href="mailto:contato@plataformalocal.com" 
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              bgcolor: 'grey.100',
              padding: 2,
              borderRadius: 2,
              textAlign: 'left',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box component="img" src={emailIcon} alt="Ícone de Email" sx={{ 
                width: 24, 
                height: 24 
                }} />
            <Box>
              <Typography sx={{ 
                fontWeight: 'bold' 
                }}>
                Email
                </Typography>
              <Typography variant="body2" color="text.secondary">
                contato@plataformalocal.com
              </Typography>
            </Box>
          </Box>

          <Box
            component="a"
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              bgcolor: 'grey.100',
              padding: 2,
              borderRadius: 2,
              textAlign: 'left',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box component="img" src={whatsappIcon} alt="Ícone do WhatsApp" sx={{ 
                width: 24, 
                height: 24 
                }} />
            <Box>
              <Typography sx={{ 
                fontWeight: 'bold' 
                }}>
                WhatsApp
                </Typography>
              <Typography variant="body2" color="text.secondary">
                (11) 9 9999-9999
                </Typography>
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ 
        width: '100%', 
        padding: '24px' 
        }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="error"
          fullWidth
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: 2,
            padding: '10px 16px',
            '&:hover': {
              backgroundColor: 'var(--color-red-2)',
            },
          }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}