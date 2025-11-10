import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";

interface CreatedProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatedProductModal = ({
  isOpen,
  onClose,
}: CreatedProductModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: { xs: 2, sm: 3 },
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
          alignItems: "center",
        },
      }}
    >
      <CheckCircleOutlineIcon
        sx={{
          fontSize: isMobile ? 48 : 56,
          color: "success.main",
          marginBottom: 2,
        }}
      />

      <DialogContent sx={{ padding: "0 !important" }}>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="h2"
          sx={{ fontWeight: "bold" }}
        >
          Produto criado com sucesso!
        </Typography>
        <Typography
          variant={isMobile ? "body2" : "body1"}
          color="text.secondary"
          sx={{ marginTop: 1, fontWeight: "bold" }}
        >
          Boas vendas! Aproveite tudo que a plataforma pode te oferecer
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 0 0 0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{
            width: { xs: "100%", sm: "auto" },
            flexGrow: 1,
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 2,
            padding: "10px 16px",
          }}
        >
          Criar outro produto
        </Button>

        <Link to="/dashboard">
          <Button
            variant="outlined"
            color="primary"
            sx={{
              width: { xs: "100%", sm: "auto" },
              flexGrow: 1,
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 2,
              padding: "10px 16px",
              "&:hover": {
                backgroundColor: "var(--color-orange-pale-2)",
              },
            }}
          >
            Dashboard
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};
