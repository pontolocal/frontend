import { Dialog, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  buttonText?: string
}

export const SuccessModal = ({
  isOpen,
  onClose,
  title = "Sucesso!",
  message,
  buttonText = "OK",
}: SuccessModalProps) => {

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: 4, padding: 2 } }}
    >
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 70, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {message}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ paddingX: 3, paddingBottom: 2,justifyContent: 'center' }}>
        <Button onClick={onClose} variant="contained" size="medium" sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            px: 3 
          }}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}