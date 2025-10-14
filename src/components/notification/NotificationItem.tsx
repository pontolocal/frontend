import { Paper, Typography, Box, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { Notification } from '../../types/notifications'

type NotificationItemProps = {
  notification: Notification;
  onActionClick: (id: string | number) => void;
  onDismiss: (id: string | number) => void;
};

export const NotificationItem = ({ notification, onActionClick, onDismiss }: NotificationItemProps) => {
  
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDismiss(notification.id)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        padding: 2,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        boxShadow: notification.isNew ? '0px 0px 0px 2px rgba(114, 140, 204, 0.5)' : 'none',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        },
      }}
    >
      <IconButton
  onClick={handleDismiss}
  sx={{
    position: 'absolute', top: 8, right: 8,
    width: 20,
    height: 20,
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    borderRadius: '10px',
        '&:hover': {
      backgroundColor: 'primary.dark',
    },
  }}
>
  <CloseIcon fontSize="small" />
</IconButton>

      <Typography variant="h6" sx={{ 
        fontWeight: 'bold', 
        letterSpacing: '0.5px', 
        pr: 4 
        }}>
        {notification.title}
      </Typography>
      
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
        {notification.timestamp}
      </Typography>

      {notification.subtitle && (
        <Box sx={{ 
            display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        mt: 1 
        }}>
          {notification.icon && <Typography>{notification.icon}</Typography>}
          <Typography variant="body2">{notification.subtitle}</Typography>
        </Box>
      )}

      <Typography variant="body2" color="text.secondary" sx={{ 
        mt: 1, 
        whiteSpace: 'pre-wrap', 
        lineHeight: 1.6 
        }}>
        {notification.body}
      </Typography>

      {notification.actionText && (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            mt: 2 
            }}>
          <Button 
            variant="contained" 
            color="primary"
            size="medium"
            onClick={() => onActionClick(notification.id)}
          >
            {notification.actionText}
          </Button>
        </Box>
      )}
    </Paper>
  )
}