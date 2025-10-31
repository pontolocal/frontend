import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Email,
} from "@mui/icons-material";
import { validateEmail } from "../lib/validators";
import { useLogin } from "../hooks/useLogin";
import type { LoginRequest } from "../models/User";
import { useAuth } from "../api/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginRequest>({
    login: "",
    password: "",
  });
  const [errors, setErrors] = useState({ login: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "login") {
      if (value && !validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          login: "Por favor, insira um endereço de e-mail válido.",
        }));
      }
    }
    if (name === "password") {
      if (value && value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "A senha deve conter no mínimo 8 caracteres.",
        }));
      }
    }
  };

  const {
    login: responseLogin,
    fetchLogin,
    isLoading,
    errorMessage,
  } = useLogin("/auth/login");
  const [formSummited, setFormSummited] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSummited(true);
    const isloginValid = validateEmail(formData.login);
    const isPasswordValid = formData.password.length >= 8;

    if (isloginValid && isPasswordValid) {
      fetchLogin(formData);
      console.log("Validation OK! Submitting data:", { ...formData });
      //   alert("Login enviado com sucesso!");
    } else {
      setErrors({
        login: isloginValid
          ? ""
          : "Por favor, insira um endereço de e-mail válido.",
        password: isPasswordValid
          ? ""
          : "A senha deve conter no mínimo 8 caracteres.",
      });
    }
  };

  useEffect(() => {
    if (errorMessage === "") {
      login(responseLogin.token);
      navigate("/welcome");
    } else {
      if (formSummited) {
        setStateError(true);
      }
      setFormSummited(false);
    }
  }, [errorMessage, navigate]);

  const [stateError, setStateError] = React.useState(false);

  const handleClose = () => {
    setStateError(false);
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Container
          component="main"
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {errorMessage.length > 0 && (
            <Snackbar
              autoHideDuration={4000}
              open={stateError}
              onClose={handleClose}
              className="absolute top-1 right-1 z-50 h-fit w-fit"
            >
              <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box
              component="img"
              src="../../public/LogoPontoLocal.png"
              alt="Logo Ponto Local"
              sx={{ width: { xs: "150px", sm: "200px" }, mb: 1 }}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: 351, sm: 700, md: 650 },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <MuiLink
              component={RouterLink}
              to="/"
              variant="body2"
              sx={{
                display: "flex",
                fontWeight: "bold",
                color: "text.primary",
                textDecoration: "none",
                mb: 1,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              <ArrowBack sx={{ fontSize: { xs: 16, sm: 18 }, mr: 0.5 }} />
              Voltar à página inicial
            </MuiLink>

            <Paper
              elevation={8}
              className="p-6 md:p-8"
              sx={{ width: "100%", maxWidth: { xs: 351, sm: 700, md: 650 } }}
            >
              <form onSubmit={handleSubmit} noValidate>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  <Typography
                    component="h1"
                    variant="h6"
                    sx={{ fontWeight: "600", margin: "auto" }}
                  >
                    Faça login em sua conta
                  </Typography>

                  <TextField
                    label="login"
                    name="login"
                    type="email"
                    placeholder="seu@email.com"
                    fullWidth
                    value={formData.login}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.login}
                    helperText={errors.login}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Senha"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    fullWidth
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: { sm: "space-between" },
                      alignItems: "center",
                      gap: { xs: 1, sm: 0 },
                      mt: -1,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: "0.8rem", sm: "0.9rem" },
                          }}
                        >
                          Lembrar senha e manter-me logado
                        </Typography>
                      }
                      sx={{ flexShrink: 0, ml: { xs: -0.1, sm: 0 } }}
                    />
                    <MuiLink
                      component={RouterLink}
                      to="/forgot-password"
                      variant="body2"
                      sx={{ color: "primary.main", fontWeight: "bold" }}
                    >
                      Esqueceu a senha?
                    </MuiLink>
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Entrar
                  </Button>
                  <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    Não tem uma conta?{" "}
                    <MuiLink
                      component={RouterLink}
                      to="/signup"
                      sx={{ color: "primary.main", fontWeight: "bold" }}
                    >
                      Cadastre-se
                    </MuiLink>
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ color: "grey.600" }}
                  >
                    ou
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                    }}
                  >
                    <div className="m-auto">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          if (credentialResponse.credential) {
                            login(credentialResponse.credential);
                          }
                        }}
                        onError={() => {
                          console.error("Erro ao tentar login com Google");
                        }}
                      />
                    </div>
                    {/* <Button
                      variant="contained"
                      fullWidth
                      startIcon={<Google />}
                      sx={{
                        py: 1.5,
                        bgcolor: "white",
                        color: "black",
                        border: "1px solid #E0E0E0",
                        "&:hover": { bgcolor: "#f5f5f5" },
                      }}
                    >
                      Entrar com o Google
                    </Button> */}
                    {/* <Button
                      variant="contained"
                      fullWidth
                      startIcon={<Facebook />}
                      sx={{
                        py: 1.5,
                        bgcolor: "white",
                        color: "black",
                        border: "1px solid #E0E0E0",
                        "&:hover": { bgcolor: "#f5f5f5" },
                      }}
                    >
                      Entrar com o Facebook
                    </Button> */}
                  </Box>
                </Box>
              </form>
            </Paper>
          </Box>
        </Container>
      )}
    </>
  );
};

export default LoginPage;
