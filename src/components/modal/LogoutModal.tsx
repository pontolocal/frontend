import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useGlobal } from "../../hooks/useGlobal";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Sair da Conta",
  message = "Tem certeza que deseja sair da sua conta?",
}: LogoutModalProps) => {
  const { themeMode } = useGlobal();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          minWidth: "320px",
          padding: 1,
          backgroundColor: themeMode === "light" ? "white" : "#1D2333",
          color: themeMode === "light" ? "black" : "white",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.2rem",
          paddingBottom: 1,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "0 !important" }}>
        <DialogContentText
          sx={{ color: themeMode === "light" ? "black" : "white" }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "16px 24px",
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            flex: 1,
            backgroundColor: "grey.300",
            color: "text.primary",
            "&:hover": {
              backgroundColor: "grey.400",
            },
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 2,
            padding: "8px 16px",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          autoFocus
          sx={{
            flex: 1,
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 2,
            padding: "8px 16px",
          }}
        >
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  );
};
