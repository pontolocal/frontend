
import { useState } from 'react'
import { NotificationModal } from '../components/modal/NotificationModal'
import type { Notification } from '../types/notifications'
import notificationsData from '../data/notifications.json'

const Notifications = () => {
    const [notificationModalOpen, setNotificationModalOpen] = useState(true)
  
    const [notifications, setNotifications] = useState<Notification[]>(notificationsData)

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
    <main className='mt-52'>
       <NotificationModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        notifications={notifications}
        onNotificationAction={handleNotificationAction}
        onNotificationDismiss={handleDismissNotification}
      />
    </main>
  )
}

export default Notifications