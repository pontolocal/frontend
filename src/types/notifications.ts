export type Notification = {
  id: string | number;
  title: string;
  timestamp: string;
  icon?: string;
  subtitle?: string;
  body: string;
  actionText?: string;
  isNew?: boolean;
}