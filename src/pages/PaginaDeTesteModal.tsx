import { useState } from 'react'
import { Button, Box, Typography, Stack, Alert } from '@mui/material'
import { LogoutModal } from '../components/modal/LogoutModal'
import { DeleteModal } from '../components/modal/DeleteModal'
import { ReviewSuccessModal } from '../components/modal/ReviewSuccessModal'
import { ContactModal } from '../components/modal/ContactModal'
import { NotificationModal } from '../components/modal/NotificationModal'
import type { Notification } from '../types/notifications'
import notificationsData from '../data/notifications.json'

const PaginaDeTeste = () => {

  const imageUrl = 'https://images7.alphacoders.com/139/thumb-1920-1398046.jpg'

  const [logoutModalOpen, setLogoutModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [notificationModalOpen, setNotificationModalOpen] = useState(false)

  const [notifications, setNotifications] = useState<Notification[]>(notificationsData)

  const handleLogout = () => { console.log("Ação: Usuário deslogado!"); setLogoutModalOpen(false)
  }

  const handleDelete = () => { console.log("Ação: Usuário deletado!"); setDeleteModalOpen(false)
  }

  const handleStartSelling = () => { console.log("Ação: Começar a vender!"); setReviewModalOpen(false)
  }

  const handleExploreProducts = () => { console.log("Ação: Explorar produtos!"); setReviewModalOpen(false) 
  }
  
  const handleNotificationAction = (id: string | number) => {
    console.log(`Ação da notificação ID ${id} foi clicada!`)
    setNotificationModalOpen(false)
  }
  
  const handleDismissNotification = (id: string | number) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notif) => notif.id !== id)
    )
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'flex-end', 
      minHeight: '100vh', 
      padding: 10,
      boxSizing: 'border-box',

      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      
      color: 'white',
      '& .MuiTypography-root, & .MuiAlert-message strong': {
        color: 'white',
      },
      '& .MuiAlert-standardSuccess': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(4px)',
        color: 'greenyellow'
      }
      }}>
      <Typography variant="h4" gutterBottom>Teste de Modais</Typography>

      <Alert  sx={{ mb: 3, maxWidth: '300px' }}>
        Notificações carregadas diretamente do arquivo <strong>.json</strong>!
      </Alert>
      
      <Stack spacing={2} sx={{ alignItems: 'center', width: '100%', maxWidth: '300px' }}>
        <Button fullWidth variant="contained" color="secondary" onClick={() => setNotificationModalOpen(true)}>
          Abrir Modal de Notificações ({notifications.length})
        </Button>
        <Button fullWidth variant="contained" onClick={() => setLogoutModalOpen(true)}>Abrir Modal de Logout</Button>
        <Button fullWidth variant="contained" color="error" onClick={() => setDeleteModalOpen(true)}>Abrir Modal de Deleção</Button>
        <Button fullWidth variant="contained" color="success" onClick={() => setReviewModalOpen(true)}>Abrir Modal de Avaliação</Button>
        <Button fullWidth variant="contained" color="info" onClick={() => setContactModalOpen(true)}>Abrir Modal de Contato</Button>
      </Stack>

      <LogoutModal isOpen={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} onConfirm={handleLogout} />
      <DeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleDelete} />
      <ReviewSuccessModal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} onStartSelling={handleStartSelling} onExploreProducts={handleExploreProducts} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      
      <NotificationModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        notifications={notifications}
        onNotificationAction={handleNotificationAction}
        onNotificationDismiss={handleDismissNotification}
      />
    </Box>
  )
}

export default PaginaDeTeste