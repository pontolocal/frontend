// --- IMPORTS ---
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as React from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  CircularProgress,
  Box,
  Link as MuiLink,
  InputAdornment,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Person,
  Business,
  ArrowBack,
  Email,
  Lock,
  WhatsApp,
  Link as LinkIcon,
  Home,
  LocationCity,
  Public,
  VpnKey,
} from "@mui/icons-material";
import { maskCPF, maskCNPJ, maskWhatsApp, maskCEP } from "../lib/formatters";
import {
  validateEmail,
  validateCPF,
  validateCNPJ,
  validatePassword,
  doPasswordsMatch,
} from "../lib/validators";
import type { SignUpFormData } from "../types/form";
import { useUser } from "../hooks/useUserRegister";

const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    login: "",
    password: "",
    confirmPassword: "",
    whatsapp: "",
    social_media_link: "",
    zip_code: "",
    address_complement: "",
    document: "",
    role: 1,
    description: "",
    state: "",
    city: "",
    address: "",
  });
  // const [documentType, setDocumentType] = useState<DocumentType>(1)
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [isCepLoading, setIsCepLoading] = useState<boolean>(false);
  const [cepValidated, setCepValidated] = useState<boolean>(false);
  const [documentValidated, setDocumentValidated] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    const { name, login, password, whatsapp, zip_code, document, role } =
      formData;
    // const isNameFilled = formData.role === 1 ? name : companyName
    const requiredFieldsFilled =
      name && login && password && whatsapp && zip_code && document && role;
    const hasErrors = Object.values(errors).some((error) => error);

    setIsButtonDisabled(
      !(
        requiredFieldsFilled &&
        cepValidated &&
        documentValidated &&
        termsAccepted &&
        !hasErrors
      )
    );
  }, [formData, cepValidated, documentValidated, termsAccepted, errors]);

  const placeholders = {
    name: "Digite seu nome",
    companyName: "Digite o nome da sua empresa",
    login: "seuemail@exemplo.com",
    document: { CPF: "000.000.000-00", CNPJ: "00.000.000/0000-00" },
    social_media_link: "https://sua-rede-social.com",
    whatsapp: "(00) 00000-0000",
    zip_code: "00000-000",
    address_complement: "Ex: Apto 101, Bloco B",
    password: "Use 8 ou mais caracteres",
    confirmPassword: "Repita sua senha",
    role: 1,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    let maskedValue = value;

    if (name === "document") {
      maskedValue = formData.role === 1 ? maskCPF(value) : maskCNPJ(value);
    } else if (name === "whatsapp") {
      maskedValue = maskWhatsApp(value);
    } else if (name === "cep") {
      maskedValue = maskCEP(value);
    }
    setFormData((prev) => ({ ...prev, [name]: maskedValue }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as {
      name: keyof SignUpFormData;
      value: string;
    };
    let errorMsg: string = "";

    if (name === "login" && value && !validateEmail(value)) {
      errorMsg = "E-mail inválido.";
    } else if (name === "document") {
      const isValid = value
        ? formData.role === 1
          ? validateCPF(value)
          : validateCNPJ(value)
        : false;
      if (value && !isValid) {
        errorMsg = `${formData.role === 1 ? "CPF" : "CNPJ"} inválido.`;
      }
      setDocumentValidated(isValid);
    } else if (name === "password") {
      if (value && !validatePassword(value)) {
        errorMsg = "A senha deve ter no mínimo 8 caracteres.";
      }
    } else if (name === "confirmPassword") {
      if (value && !doPasswordsMatch(formData.password, value)) {
        errorMsg = "As senhas não coincidem.";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg || undefined }));
  };

  const handleDocumentTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newDocType = e.target.value;
    setFormData({ ...formData, role: Number(newDocType) });
    setFormData((prev) => ({ ...prev, document: "", name: "" }));
    setDocumentValidated(false);
    setErrors((prev) => ({ ...prev, document: undefined }));
  };

  const handleCepLookup = async (): Promise<void> => {
    const cep = formData.zip_code.replace(/\D/g, "");
    if (cep.length !== 8) return;

    setIsCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErrors((prev) => ({ ...prev, cep: "CEP não encontrado." }));
        setCepValidated(false);
      } else {
        setFormData((prev) => ({
          ...prev,
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
        setCepValidated(true);
        setErrors((prev) => ({ ...prev, cep: undefined }));
      }
    } catch (error) {
      console.error("CEP lookup failed:", error);
      setErrors((prev) => ({ ...prev, cep: "Erro ao buscar CEP." }));
      setCepValidated(false);
    } finally {
      setIsCepLoading(false);
    }
  };

  const {
    name,
    login,
    password,
    whatsapp,
    zip_code,
    document,
    role,
    address_complement,
    social_media_link,
  } = formData;
  const requestData = {
    name,
    login,
    password,
    whatsapp,
    social_media_link,
    zip_code,
    address_complement,
    document,
    role,
  };

  const { fetchUser, isLoading, errorMessage } =
    useUser("/auth/register");

  const navigate = useNavigate();

  const [formSummited, setFormSummited] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent): void => {
    setFormSummited(true);
    e.preventDefault();
    fetchUser(requestData);
  };

  useEffect(() => {
    if (errorMessage === "") {
      navigate("/login");
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
          <Box className="flex flex-col items-center mb-6">
            <Box
              component="img"
              src="../../public/LogoPontoLocal.png"
              alt="Imagem Logo PontoLocal"
              sx={{ width: { xs: "100px", sm: "150px" } }}
              className="mb-1"
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              maxWidth: "700px",
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
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
          </Box>

          <Paper
            elevation={8}
            className="p-6 md:p-8"
            sx={{ borderRadius: "41px", width: "100%", maxWidth: "700px" }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Typography
                  component="h1"
                  variant="h6"
                  sx={{ fontWeight: "600", margin: "auto" }}
                >
                  Crie sua conta
                </Typography>
                <Box>
                  <Typography
                    variant="subtitle1"
                    className="font-semibold text-gray-600 text-center"
                    sx={{ mb: 2 }}
                  >
                    Documento *
                  </Typography>
                  <RadioGroup
                    row
                    name="documentType"
                    value={formData.role}
                    onChange={handleDocumentTypeChange}
                    sx={{ justifyContent: "center", gap: 2 }}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio size="small" />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Person
                            sx={{
                              color:
                                formData.role === 1
                                  ? "secondary.main"
                                  : "grey.500",
                            }}
                          />{" "}
                          CPF
                        </Box>
                      }
                      sx={{
                        flex: { xs: 1, sm: "initial" },
                        justifyContent: "center",
                        border: 1,
                        borderColor:
                          formData.role === 1 ? "#7BB3E0" : "grey.400",
                        borderRadius: 2,
                        m: 0,
                        py: 0.5,
                        px: { sm: 2 },
                      }}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio size="small" />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Business
                            sx={{
                              color:
                                formData.role === 2
                                  ? "secondary.main"
                                  : "grey.500",
                            }}
                          />{" "}
                          CNPJ
                        </Box>
                      }
                      sx={{
                        flex: { xs: 1, sm: "initial" },
                        justifyContent: "center",
                        border: 1,
                        borderColor:
                          formData.role === 2 ? "#7BB3E0" : "grey.400",
                        borderRadius: 2,
                        m: 0,
                        py: 0.5,
                        px: { sm: 2 },
                      }}
                    />
                  </RadioGroup>
                </Box>

                {formData.role === 1 ? (
                  <TextField
                    size="small"
                    name="name"
                    label="Nome completo *"
                    fullWidth
                    onChange={handleChange}
                    value={formData.name}
                    placeholder={placeholders.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <TextField
                    sx={{ "& .MuiOutlinedInput-root": { height: "40px" } }}
                    size="small"
                    name="name"
                    label="Nome da empresa *"
                    fullWidth
                    onChange={handleChange}
                    value={formData.name}
                    placeholder={placeholders.companyName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}

                <TextField
                  size="small"
                  name="login"
                  label="E-mail *"
                  type="email"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.login}
                  error={!!errors.login}
                  helperText={errors.login}
                  placeholder={placeholders.login}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  size="small"
                  name="document"
                  label={`${formData.role === 1 ? "CPF" : "CNPJ"} *`}
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.document}
                  error={!!errors.document}
                  helperText={errors.document}
                  placeholder={placeholders.role === 1 ? "CPF" : "CNPJ"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKey />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  size="small"
                  name="description"
                  label={
                    formData.role === 1
                      ? "Fale sobre você"
                      : "Fale sobre a sua empresa"
                  }
                  fullWidth
                  multiline
                  rows={3}
                  onChange={handleChange}
                  value={formData.description}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <TextField
                    sx={{ width: { xs: "100%", sm: "50%" } }}
                    size="small"
                    name="social_media_link"
                    label="Link (site ou rede social)"
                    fullWidth
                    onChange={handleChange}
                    value={formData.social_media_link}
                    placeholder={placeholders.social_media_link}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    sx={{ width: { xs: "100%", sm: "50%" } }}
                    size="small"
                    name="whatsapp"
                    label="WhatsApp *"
                    type="tel"
                    fullWidth
                    onChange={handleChange}
                    value={formData.whatsapp}
                    placeholder={placeholders.whatsapp}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WhatsApp />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Typography
                  variant="body1"
                  className="font-bold text-gray-700 mt-2 pt-2"
                >
                  Endereço
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    alignItems: "flex-start",
                  }}
                >
                  <TextField
                    sx={{ width: { xs: "100%", sm: "70%" } }}
                    size="small"
                    name="zip_code"
                    label="Digite seu CEP *"
                    type="tel"
                    fullWidth
                    onChange={handleChange}
                    value={formData.zip_code}
                    error={!!errors.zip_code}
                    helperText={errors.zip_code}
                    placeholder={placeholders.zip_code}
                  />
                  <Button
                    sx={{ width: { xs: "100%", sm: "20%" }, height: "40px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleCepLookup}
                    disabled={
                      isCepLoading ||
                      formData.zip_code.replace(/\D/g, "").length < 8
                    }
                  >
                    {isCepLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Validar CEP"
                    )}
                  </Button>
                </Box>

                {cepValidated && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <TextField
                      size="small"
                      label="Endereço"
                      fullWidth
                      value={formData.address}
                      name="address"
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Home />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                      }}
                    >
                      <TextField
                        sx={{ width: { xs: "100%", sm: "50%" } }}
                        size="small"
                        label="Estado"
                        fullWidth
                        value={formData.state}
                        name="state"
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Public />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        sx={{ width: { xs: "100%", sm: "50%" } }}
                        size="small"
                        label="Cidade"
                        name="city"
                        fullWidth
                        value={formData.city}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationCity />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Box>
                )}

                <TextField
                  size="small"
                  name="address_complement"
                  label="address_complemento"
                  fullWidth
                  onChange={handleChange}
                  value={formData.address_complement}
                  placeholder={placeholders.address_complement}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Home />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <TextField
                    sx={{ width: { xs: "100%", sm: "50%" } }}
                    size="small"
                    name="password"
                    label="Crie uma senha *"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.password}
                    error={!!errors.password}
                    helperText={errors.password}
                    placeholder={placeholders.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    sx={{ width: { xs: "100%", sm: "50%" } }}
                    size="small"
                    name="confirmPassword"
                    label="Confirmar senha *"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    placeholder={placeholders.confirmPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Eu aceito os&nbsp;
                      <MuiLink
                        href="https://drive.google.com/file/d/1D58RmB83AlSpkSCdlIhKXW-CwF_HbJIg/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "primary.main", fontWeight: "bold" }}
                      >
                        Termos e condições
                      </MuiLink>
                    </Typography>
                  }
                />

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Tooltip
                    title={
                      isButtonDisabled
                        ? "Preencha todos os campos obrigatórios e aceite os termos"
                        : ""
                    }
                  >
                    <span>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isButtonDisabled}
                        sx={{
                          width: { xs: "200px", sm: "440px", md: "440px" },
                          py: 1.5,
                        }}
                      >
                        Cadastrar Usuário
                      </Button>
                    </span>
                  </Tooltip>
                </Box>
              </Box>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default SignUpPage;
