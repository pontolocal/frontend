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
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Person,
  Business,
  ArrowBack,
  WhatsApp,
  Link as LinkIcon,
  Home,
  LocationCity,
  Public,
  VpnKey,
} from "@mui/icons-material";
import { maskCPF, maskCNPJ, maskWhatsApp, maskCEP } from "../lib/formatters";
import { validateCPF, validateCNPJ } from "../lib/validators";
import type { SignUpFormData } from "../types/form";
import Usericon from "../assets/images/user-outline-icon.svg";
import EditIcon from "../assets/images/edit-icon.svg";
import { useUpdateUser } from "../hooks/useUpdateUser";
// import type { UserUpdateRequest } from "../models/User";
import { useGetUser } from "../hooks/useGetUser";
import { useGlobal } from "../hooks/useGlobal";
// import { useGlobal } from "../hooks/useGlobal";

const EditProfile = () => {
  const [formData, setFormData] = useState<any>({
    name: "",
    address_complement: "",
    document: "",
    role: 1,
    social_media_link: "",
    whatsapp: "",
    zip_code: "",
    city: "",
    address: "",
    state: "",
  });
  const [errors, setErrors] = useState<Partial<any>>({});
  const [isCepLoading, setIsCepLoading] = useState<boolean>(false);
  const [cepValidated, setCepValidated] = useState<boolean>(false);
  // const [documentValidated, setDocumentValidated] = useState<boolean>(false);
  // const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { themeMode } = useGlobal();

  const userId = localStorage.getItem("userId");

  const { user, fetchGetUser } = useGetUser(`/auth/get/${userId}`);

  useEffect(() => {
    fetchGetUser();
  }, []);

  useEffect(() => {
    if (user) {
      const { id, password, ...getRequest } = user;
      setFormData({
        name: user.name || "",
        address_complement: user.address_complement || "",
        document: user.document || "",
        role: user.role || 1,
        social_media_link: user.social_media_link || "",
        whatsapp: user.whatsapp || "",
        zip_code: user.zip_code || "",
        city: user.city || "",
        address: user.address || "",
        state: user.state || "",
      });
      console.log("user", user, "formData:", getRequest);
    }
  }, [user]);

  useEffect(() => {
    const { name, document, role, whatsapp, zip_code } = formData;
    // const isNameFilled = formData.role === 1 ? name : companyName
    const requiredFieldsFilled =
      name && whatsapp && zip_code && document && role;
    const hasErrors = Object.values(errors).some((error) => error);

    setIsButtonDisabled(
      !(requiredFieldsFilled && cepValidated && !hasErrors)
    );
  }, [formData, cepValidated, errors]);

  const placeholders = {
    name: "Digite seu nome",
    companyName: "Digite o nome da sua empresa",
    document: { CPF: "000.000.000-00", CNPJ: "00.000.000/0000-00" },
    social_media_link: "https://sua-rede-social.com",
    whatsapp: "(00) 00000-0000",
    zip_code: "00000-000",
    address_complement: "Ex: Apto 101, Bloco B",
    role: 1,
    bio: "escreva sobre você"
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
    setFormData((prev: any) => ({ ...prev, [name]: maskedValue }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as {
      name: keyof SignUpFormData;
      value: string;
    };
    let errorMsg: string = "";

    if (name === "document") {
      const isValid = value
        ? formData.role === 1
          ? validateCPF(value)
          : validateCNPJ(value)
        : false;
      if (value && !isValid) {
        errorMsg = `${formData.role === 1 ? "CPF" : "CNPJ"} inválido.`;
      }
      // setDocumentValidated(isValid);
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg || undefined }));
  };

  const handleDocumentTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newDocType = e.target.value;
    setFormData({ ...formData, role: Number(newDocType) });
    setFormData((prev: any) => ({ ...prev, document: "", name: "" }));
    // setDocumentValidated(false);
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
        setFormData((prev: any) => ({
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
    address_complement,
    document,
    role,
    social_media_link,
    whatsapp,
    zip_code,
    city,
    address,
    state,
    bio
  } = formData;

  const requestData: any = {
    name,
    address_complement,
    document,
    role,
    social_media_link,
    whatsapp,
    zip_code,
    city,
    address,
    state,
    bio
  };

  const { fetchUpdateUser, isLoading, errorMessage } = useUpdateUser(
    `/auth/update/${userId}`
  );

  const navigate = useNavigate();

  const [formSummited, setFormSummited] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent): void => {
    setFormSummited(true);
    e.preventDefault();
    console.log("request data ", requestData);
    fetchUpdateUser(requestData);
  };

  useEffect(() => {
    if (errorMessage === "") {
      navigate("/home");
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
            padding: "30px 0 30px 0",
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
              width: "100%",
              maxWidth: "700px",
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <MuiLink
              component={RouterLink}
              to="/profile"
              variant="body2"
              sx={{
                display: "flex",
                fontWeight: "bold",
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
            className={`p-6 md:p-8 ${
              themeMode === "light" ? "text-black!" : "text-white!"
            }`}
            sx={{
              borderRadius: "41px",
              width: "100%",
              maxWidth: "700px",
              backgroundColor: themeMode === "light" ? "white" : "#1D2333",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Box className="flex flex-col items-center mb-6 pt-4">
                  <Typography
                    component="h1"
                    variant="h6"
                    sx={{ fontWeight: "600", paddingBottom: "10px" }}
                  >
                    Edite sua conta
                  </Typography>

                  <div className="w-[100px] h-[100px] bg-blue-1 rounded-full flex justify-center relative items-center =">
                    <img
                      src={Usericon}
                      alt="Usericon"
                      className="w-2/3 h-2/3 object-contain"
                    />
                    <div className="absolute right-0 bottom-2 rounded-full shadow-md bg-white w-[30px] h-[30px] flex justify-center items-center hover:bg-blue-6 cursor-pointer">
                      <img
                        src={EditIcon}
                        alt="EditIcon"
                        className="w-2/3 h-2/3 object-contain"
                      />
                    </div>
                  </div>
                </Box>
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
                          <Person
                            style={{
                              color: themeMode === "light" ? "gray" : "white",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: themeMode === "light" ? "black" : "white",
                        "& fieldset": {
                          borderColor: themeMode === "light" ? "gray" : "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: themeMode === "light" ? "gray" : "white",
                      },
                    }}
                  />
                ) : (
                  <TextField
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: themeMode === "light" ? "black" : "white",
                        "& fieldset": {
                          borderColor: themeMode === "light" ? "gray" : "white",
                        },
                        height: "40px",
                      },
                      "& .MuiInputLabel-root": {
                        color: themeMode === "light" ? "gray" : "white",
                      },
                    }}
                  />
                )}

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
                        <VpnKey
                          style={{
                            color: themeMode === "light" ? "gray" : "white",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: themeMode === "light" ? "black" : "white",
                      "& fieldset": {
                        borderColor: themeMode === "light" ? "gray" : "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: themeMode === "light" ? "gray" : "white",
                    },
                  }}
                />
                <TextField
                  size="small"
                  name="bio"
                  label={
                    formData.role === 1
                      ? "Fale sobre você"
                      : "Fale sobre a sua empresa"
                  }
                  fullWidth
                  multiline
                  rows={3}
                  onChange={handleChange}
                  value={formData.bio}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <TextField
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
                          <LinkIcon
                            style={{
                              color: themeMode === "light" ? "gray" : "white",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: { xs: "100%", sm: "50%" },
                      "& .MuiOutlinedInput-root": {
                        color: themeMode === "light" ? "black" : "white",
                        "& fieldset": {
                          borderColor: themeMode === "light" ? "gray" : "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: themeMode === "light" ? "gray" : "white",
                      },
                    }}
                  />
                  <TextField
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
                          <WhatsApp
                            style={{
                              color: themeMode === "light" ? "gray" : "white",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: { xs: "100%", sm: "50%" },
                      "& .MuiOutlinedInput-root": {
                        color: themeMode === "light" ? "black" : "white",
                        "& fieldset": {
                          borderColor: themeMode === "light" ? "gray" : "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: themeMode === "light" ? "gray" : "white",
                      },
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
                    sx={{
                      width: { xs: "100%", sm: "70%" },
                      "& .MuiOutlinedInput-root": {
                        color: themeMode === "light" ? "black" : "white",
                        "& fieldset": {
                          borderColor: themeMode === "light" ? "gray" : "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: themeMode === "light" ? "gray" : "white",
                      },
                    }}
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
                            <Home
                              style={{
                                color: themeMode === "light" ? "gray" : "white",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        width: { xs: "100%", sm: "50%" },
                        "& .MuiOutlinedInput-root": {
                          color: themeMode === "light" ? "black" : "white",
                          "& fieldset": {
                            borderColor:
                              themeMode === "light" ? "gray" : "white",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: themeMode === "light" ? "gray" : "white",
                        },
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
                        size="small"
                        label="Estado"
                        fullWidth
                        value={formData.state}
                        name="state"
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Public
                                style={{
                                  color:
                                    themeMode === "light" ? "gray" : "white",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          width: { xs: "100%", sm: "50%" },
                          "& .MuiOutlinedInput-root": {
                            color: themeMode === "light" ? "black" : "white",
                            "& fieldset": {
                              borderColor:
                                themeMode === "light" ? "gray" : "white",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: themeMode === "light" ? "gray" : "white",
                          },
                        }}
                      />
                      <TextField
                        size="small"
                        label="Cidade"
                        name="city"
                        fullWidth
                        value={formData.city}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationCity
                                style={{
                                  color:
                                    themeMode === "light" ? "gray" : "white",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          width: { xs: "100%", sm: "50%" },
                          "& .MuiOutlinedInput-root": {
                            color: themeMode === "light" ? "black" : "white",
                            "& fieldset": {
                              borderColor:
                                themeMode === "light" ? "gray" : "white",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: themeMode === "light" ? "gray" : "white",
                          },
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
                        <Home
                          style={{
                            color: themeMode === "light" ? "gray" : "white",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: themeMode === "light" ? "black" : "white",
                      "& fieldset": {
                        borderColor: themeMode === "light" ? "gray" : "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: themeMode === "light" ? "gray" : "white",
                    },
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                ></Box>

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
                        Salvar
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

export default EditProfile;
