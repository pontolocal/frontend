import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
}

export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Deletar Perfil',
  message = 'Tem certeza que deseja deletar seu perfil? Esta ação não pode ser desfeita.',
}: DeleteModalProps) => {
  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      PaperProps={{ 
        sx: { 
          borderRadius: 4, 
          padding: 1,
          width: '100%',     
          maxWidth: '380px',
          minHeight: '200px',
        } 
      }}
    >
      <DialogTitle sx={{ 
        fontWeight: 'bold', 
        fontSize: '1.2rem', 
        paddingBottom: 1 
        }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ paddingTop: '0 !important' }}>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px', gap: 1 }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          color="primary" 
          sx={{ 
            flex: 1, 
            textTransform: 'none', 
            fontWeight: 'bold', 
            borderRadius: 2, 
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: 'var(--color-orange-pale-2)'
            }
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error" 
          autoFocus 
          sx={{ 
            flex: 1, 
            textTransform: 'none', 
            fontWeight: 'bold', 
            borderRadius: 2, 
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: 'var(--color-red-2)'
            }
          }}
        >
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  )
}