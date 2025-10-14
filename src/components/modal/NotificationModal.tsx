// ARQUIVO: src/components/modal/NotificationModal.tsx

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography } from '@mui/material'
import type { Notification } from '../../types/notifications'
import { NotificationItem } from '../notification/NotificationItem'

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  onNotificationAction: (id: string | number) => void
  onNotificationDismiss: (id: string | number) => void
}

export const NotificationModal = ({
  isOpen,
  onClose,
  notifications,
  onNotificationAction,
  onNotificationDismiss,
}: NotificationModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ 
        sx: { 
          borderRadius: 4,
          height: { xs: '90vh', sm: '80vh' },
          maxHeight: '800px',
          backgroundColor: 'var(--color-blue-2)', 
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        } 
      }}
    >
      <DialogTitle sx={{ 
        fontWeight: 'bold', 
        fontSize: '1.4rem',
        color: 'white',
      }}>
        Notificações
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <Stack spacing={2}>
          {notifications && notifications.length > 0 ? (
            notifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                notification={notif}
                onActionClick={onNotificationAction}
                onDismiss={onNotificationDismiss}
              />
            ))
          ) : (
            <Typography sx={{ textAlign: 'center', mt: 4, color: 'white' }}>
              Você não tem novas notificações.
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          color="primary"
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}