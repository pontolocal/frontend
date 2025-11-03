// import { useState, useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import * as React from "react";
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Tooltip,
//   CircularProgress,
//   Box,
//   Link as MuiLink,
//   InputAdornment,
//   Checkbox,
// } from "@mui/material";
// import {
//   Person,
//   Business,
//   ArrowBack,
//   Lock,
//   WhatsApp,
//   Link as LinkIcon,
//   Home,
//   LocationCity,
//   Public,
//   VpnKey,
// } from "@mui/icons-material";
// import { maskCPF, maskCNPJ, maskWhatsApp, maskCEP } from "../lib/formatters";
// import {
//   validateCPF,
//   validateCNPJ,
//   validatePassword,
//   doPasswordsMatch,
// } from "../lib/validators";
// import type { DocumentType, EditFormData } from "../types/form";
// import Usericon from "../assets/images/user-outline-icon.svg";
// import EditIcon from "../assets/images/edit-icon.svg";

// const EditProfile = () => {
//   const [formData, setFormData] = useState<EditFormData>({
//     companyName: "",
//     fullName: "",
//     lastPassword: "",
//     newPassword: "",
//     whatsapp: "",
//     socialLink: "",
//     cep: "",
//     address: "",
//     complement: "",
//     neighborhood: "",
//     city: "",
//     state: "",
//     document: "",
//     companyInfo: "",
//   });
//   const [documentType, setDocumentType] = useState<DocumentType>("CPF");
//   const [errors, setErrors] = useState<Partial<EditFormData>>({});
//   const [isCepLoading, setIsCepLoading] = useState<boolean>(false);
//   const [cepValidated, setCepValidated] = useState<boolean>(false);
//   const [documentValidated, setDocumentValidated] = useState<boolean>(false);
//   const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

//   useEffect(() => {
//     const {
//       companyName,
//       fullName,
//       lastPassword,
//       newPassword,
//       whatsapp,
//       cep,
//       document,
//     } = formData;
//     const isNameFilled = documentType === "CPF" ? fullName : companyName;
//     const requiredFieldsFilled =
//       isNameFilled &&
//       lastPassword &&
//       newPassword &&
//       whatsapp &&
//       cep &&
//       document;
//     const hasErrors = Object.values(errors).some((error) => error);

//     setIsButtonDisabled(
//       !(
//         requiredFieldsFilled &&
//         cepValidated &&
//         documentValidated &&
//         termsAccepted &&
//         !hasErrors
//       )
//     );
//   }, [
//     formData,
//     documentType,
//     cepValidated,
//     documentValidated,
//     termsAccepted,
//     errors,
//   ]);

//   const placeholders = {
//     fullName: "Digite seu nome completo",
//     companyName: "Digite o nome da sua empresa",
//     document: { CPF: "000.000.000-00", CNPJ: "00.000.000/0000-00" },
//     socialLink: "https://sua-rede-social.com",
//     whatsapp: "(00) 00000-0000",
//     cep: "00000-000",
//     complement: "Ex: Apto 101, Bloco B",
//     lastPassword: "Use 8 ou mais caracteres",
//     newPassword: "Repita sua senha",
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ): void => {
//     const { name, value } = e.target;
//     let maskedValue = value;

//     if (name === "document") {
//       maskedValue = documentType === "CPF" ? maskCPF(value) : maskCNPJ(value);
//     } else if (name === "whatsapp") {
//       maskedValue = maskWhatsApp(value);
//     } else if (name === "cep") {
//       maskedValue = maskCEP(value);
//     }
//     setFormData((prev) => ({ ...prev, [name]: maskedValue }));
//   };

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target as {
//       name: keyof EditFormData;
//       value: string;
//     };
//     let errorMsg: string = "";

//     if (name === "document") {
//       const isValid = value
//         ? documentType === "CPF"
//           ? validateCPF(value)
//           : validateCNPJ(value)
//         : false;
//       if (value && !isValid) {
//         errorMsg = `${documentType} inválido.`;
//       }
//       setDocumentValidated(isValid);
//     } else if (name === "lastPassword") {
//       if (value && !validatePassword(value)) {
//         errorMsg = "A senha deve ter no mínimo 8 caracteres.";
//       }
//     } else if (name === "newPassword") {
//       if (value && !doPasswordsMatch(formData.newPassword, value)) {
//         errorMsg = "As senhas não coincidem.";
//       }
//     }
//     setErrors((prev) => ({ ...prev, [name]: errorMsg || undefined }));
//   };

//   const handleDocumentTypeChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ): void => {
//     const newDocType = e.target.value as DocumentType;
//     setDocumentType(newDocType);
//     setFormData((prev) => ({
//       ...prev,
//       document: "",
//       companyName: "",
//       fullName: "",
//     }));
//     setDocumentValidated(false);
//     setErrors((prev) => ({ ...prev, document: undefined }));
//   };

//   const handleCepLookup = async (): Promise<void> => {
//     const cep = formData.cep.replace(/\D/g, "");
//     if (cep.length !== 8) return;

//     setIsCepLoading(true);
//     try {
//       const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
//       const data = await response.json();

//       if (data.erro) {
//         setErrors((prev) => ({ ...prev, cep: "CEP não encontrado." }));
//         setCepValidated(false);
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           address: data.logradouro,
//           neighborhood: data.bairro,
//           city: data.localidade,
//           state: data.uf,
//         }));
//         setCepValidated(true);
//         setErrors((prev) => ({ ...prev, cep: undefined }));
//       }
//     } catch (error) {
//       console.error("CEP lookup failed:", error);
//       setErrors((prev) => ({ ...prev, cep: "Erro ao buscar CEP." }));
//       setCepValidated(false);
//     } finally {
//       setIsCepLoading(false);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent): void => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <Container
//       component="main"
//       maxWidth="md"
//       sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <Box className="flex flex-col items-center mb-6 pt-4">
//         <Typography component="h1" variant="h6" sx={{ fontWeight: "600", paddingBottom: "10px" }}>
//           Edite sua conta
//         </Typography>

//         <div className="w-[100px] h-[100px] bg-blue-1 rounded-full flex justify-center relative items-center =">
//           <img
//             src={Usericon}
//             alt="Usericon"
//             className="w-2/3 h-2/3 object-contain"
//           />
//           <div className="absolute right-0 bottom-2 rounded-full shadow-md bg-white w-[30px] h-[30px] flex justify-center items-center hover:bg-blue-6 cursor-pointer">
//             <img
//               src={EditIcon}
//               alt="EditIcon"
//               className="w-2/3 h-2/3 object-contain"
//             />
//           </div>
//         </div>
//       </Box>

//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: "700px",
//           display: "flex",
//           justifyContent: { xs: "center", sm: "flex-start" },
//         }}
//       >
//         <MuiLink
//           component={RouterLink}
//           to="/"
//           variant="body2"
//           sx={{
//             display: "flex",
//             fontWeight: "bold",
//             color: "text.primary",
//             textDecoration: "none",
//             mb: 1,
//             fontSize: { xs: "0.9rem", sm: "1rem" },
//           }}
//         >
//           <ArrowBack sx={{ fontSize: { xs: 16, sm: 18 }, mr: 0.5 }} />
//           Voltar à página inicial
//         </MuiLink>
//       </Box>

//       <Paper
//         elevation={8}
//         className="p-6 md:p-8"
//         sx={{ borderRadius: "41px", width: "100%", maxWidth: "700px", margin: "30px" }}
//       >
//         <form onSubmit={handleSubmit} noValidate>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
//             <Box>
//               <Typography
//                 variant="subtitle1"
//                 className="font-semibold text-gray-600 text-center"
//                 sx={{ mb: 2 }}
//               >
//                 Documento *
//               </Typography>
//               <RadioGroup
//                 row
//                 name="documentType"
//                 value={documentType}
//                 onChange={handleDocumentTypeChange}
//                 sx={{ justifyContent: "center", gap: 2 }}
//               >
//                 <FormControlLabel
//                   value="CPF"
//                   control={<Radio size="small" />}
//                   label={
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Person
//                         sx={{
//                           color:
//                             documentType === "CPF"
//                               ? "secondary.main"
//                               : "grey.500",
//                         }}
//                       />{" "}
//                       CPF
//                     </Box>
//                   }
//                   sx={{
//                     flex: { xs: 1, sm: "initial" },
//                     justifyContent: "center",
//                     border: 1,
//                     borderColor:
//                       documentType === "CPF" ? "#7BB3E0" : "grey.400",
//                     borderRadius: 2,
//                     m: 0,
//                     py: 0.5,
//                     px: { sm: 2 },
//                   }}
//                 />
//                 <FormControlLabel
//                   value="CNPJ"
//                   control={<Radio size="small" />}
//                   label={
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Business
//                         sx={{
//                           color:
//                             documentType === "CNPJ"
//                               ? "secondary.main"
//                               : "grey.500",
//                         }}
//                       />{" "}
//                       CNPJ
//                     </Box>
//                   }
//                   sx={{
//                     flex: { xs: 1, sm: "initial" },
//                     justifyContent: "center",
//                     border: 1,
//                     borderColor:
//                       documentType === "CNPJ" ? "#7BB3E0" : "grey.400",
//                     borderRadius: 2,
//                     m: 0,
//                     py: 0.5,
//                     px: { sm: 2 },
//                   }}
//                 />
//               </RadioGroup>
//             </Box>

//             {documentType === "CPF" ? (
//               <TextField
//                 size="small"
//                 name="fullName"
//                 label="Nome completo *"
//                 fullWidth
//                 onChange={handleChange}
//                 value={formData.fullName}
//                 placeholder={placeholders.fullName}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Person />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             ) : (
//               <TextField
//                 sx={{ "& .MuiOutlinedInput-root": { height: "40px" } }}
//                 size="small"
//                 name="companyName"
//                 label="Nome da empresa *"
//                 fullWidth
//                 onChange={handleChange}
//                 value={formData.companyName}
//                 placeholder={placeholders.companyName}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Business />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             )}

//             <TextField
//               size="small"
//               name="document"
//               label={`${documentType} *`}
//               fullWidth
//               onChange={handleChange}
//               onBlur={handleBlur}
//               value={formData.document}
//               error={!!errors.document}
//               helperText={errors.document}
//               placeholder={placeholders.document[documentType]}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <VpnKey />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               size="small"
//               name="companyInfo"
//               label={
//                 documentType === "CPF"
//                   ? "Fale sobre você"
//                   : "Fale sobre a sua empresa"
//               }
//               fullWidth
//               multiline
//               rows={3}
//               onChange={handleChange}
//               value={formData.companyInfo}
//             />

//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 gap: 2,
//               }}
//             >
//               <TextField
//                 sx={{ width: { xs: "100%", sm: "50%" } }}
//                 size="small"
//                 name="socialLink"
//                 label="Link (site ou rede social)"
//                 fullWidth
//                 onChange={handleChange}
//                 value={formData.socialLink}
//                 placeholder={placeholders.socialLink}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LinkIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <TextField
//                 sx={{ width: { xs: "100%", sm: "50%" } }}
//                 size="small"
//                 name="whatsapp"
//                 label="WhatsApp *"
//                 type="tel"
//                 fullWidth
//                 onChange={handleChange}
//                 value={formData.whatsapp}
//                 placeholder={placeholders.whatsapp}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <WhatsApp />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Box>

//             <Typography
//               variant="body1"
//               className="font-bold text-gray-700 mt-2 pt-2"
//             >
//               Endereço
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 gap: 2,
//                 alignItems: "flex-start",
//               }}
//             >
//               <TextField
//                 sx={{ width: { xs: "100%", sm: "70%" } }}
//                 size="small"
//                 name="cep"
//                 label="Digite seu CEP *"
//                 type="tel"
//                 fullWidth
//                 onChange={handleChange}
//                 value={formData.cep}
//                 error={!!errors.cep}
//                 helperText={errors.cep}
//                 placeholder={placeholders.cep}
//               />
//               <Button
//                 sx={{ width: { xs: "100%", sm: "20%" }, height: "40px" }}
//                 variant="contained"
//                 color="primary"
//                 onClick={handleCepLookup}
//                 disabled={
//                   isCepLoading || formData.cep.replace(/\D/g, "").length < 8
//                 }
//               >
//                 {isCepLoading ? (
//                   <CircularProgress size={24} color="inherit" />
//                 ) : (
//                   "Validar CEP"
//                 )}
//               </Button>
//             </Box>

//             {cepValidated && (
//               <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
//                 <TextField
//                   size="small"
//                   label="Endereço"
//                   fullWidth
//                   value={formData.address}
//                   InputProps={{
//                     readOnly: true,
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Home />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: { xs: "column", sm: "row" },
//                     gap: 2,
//                   }}
//                 >
//                   <TextField
//                     sx={{ width: { xs: "100%", sm: "50%" } }}
//                     size="small"
//                     label="Estado"
//                     fullWidth
//                     value={formData.state}
//                     InputProps={{
//                       readOnly: true,
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Public />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     sx={{ width: { xs: "100%", sm: "50%" } }}
//                     size="small"
//                     label="Cidade"
//                     fullWidth
//                     value={formData.city}
//                     InputProps={{
//                       readOnly: true,
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocationCity />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Box>
//               </Box>
//             )}

//             <TextField
//               size="small"
//               name="complement"
//               label="Complemento"
//               fullWidth
//               onChange={handleChange}
//               value={formData.complement}
//               placeholder={placeholders.complement}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Home />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 gap: 2,
//               }}
//             >
//               <TextField
//                 sx={{ width: { xs: "100%", sm: "50%" } }}
//                 size="small"
//                 name="lastPassword"
//                 label="Crie uma senha *"
//                 type="password"
//                 fullWidth
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={formData.lastPassword}
//                 error={!!errors.lastPassword}
//                 helperText={errors.lastPassword}
//                 placeholder={placeholders.lastPassword}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Lock />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <TextField
//                 sx={{ width: { xs: "100%", sm: "50%" } }}
//                 size="small"
//                 name="newPassword"
//                 label="Confirmar senha *"
//                 type="password"
//                 fullWidth
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={formData.newPassword}
//                 error={!!errors.newPassword}
//                 helperText={errors.newPassword}
//                 placeholder={placeholders.newPassword}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Lock />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Box>

//             <FormControlLabel
//               control={
//                 <Checkbox
//                   color="primary"
//                   checked={termsAccepted}
//                   onChange={(e) => setTermsAccepted(e.target.checked)}
//                 />
//               }
//               label={
//                 <Typography variant="body2">
//                   Eu aceito os&nbsp;
//                   <MuiLink
//                     href="https://drive.google.com/file/d/1D58RmB83AlSpkSCdlIhKXW-CwF_HbJIg/view?usp=sharing"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     sx={{ color: "primary.main", fontWeight: "bold" }}
//                   >
//                     Termos e condições
//                   </MuiLink>
//                 </Typography>
//               }
//             />

//             <Box sx={{ display: "flex", justifyContent: "center" }}>
//               <Tooltip
//                 title={
//                   isButtonDisabled
//                     ? "Preencha todos os campos obrigatórios e aceite os termos"
//                     : ""
//                 }
//               >
//                 <span>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     size="large"
//                     disabled={isButtonDisabled}
//                     sx={{
//                       width: { xs: "200px", sm: "440px", md: "440px" },
//                       py: 1.5,
//                     }}
//                   >
//                     Atualizar Usuário
//                   </Button>
//                 </span>
//               </Tooltip>
//             </Box>
//           </Box>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default EditProfile;
