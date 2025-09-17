import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
    Container, Paper, Typography, TextField, Button, FormControlLabel,
    Checkbox, Box, Link as MuiLink, InputAdornment, IconButton
} from "@mui/material"
import {
    ArrowBack, Email, Lock, Visibility, VisibilityOff, Google, Facebook,
} from "@mui/icons-material"
import { validateEmail } from "../lib/validators"

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({ email: "", password: "" })
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'email') {
            if (value && !validateEmail(value)) {
                setErrors(prev => ({ ...prev, email: "Por favor, insira um endereço de e-mail válido." }))
            }
        }
        if (name === 'password') {
            if (value && value.length < 8) {
                setErrors(prev => ({ ...prev, password: "A senha deve conter no mínimo 8 caracteres." }))
            }
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const isEmailValid = validateEmail(formData.email)
        const isPasswordValid = formData.password.length >= 8

        if (isEmailValid && isPasswordValid) {
            console.log("Validation OK! Submitting data:", { ...formData, rememberMe })
            alert("Login enviado com sucesso!")
        } else {
            setErrors({
                email: isEmailValid ? "" : "Por favor, insira um endereço de e-mail válido.",
                password: isPasswordValid ? "" : "A senha deve conter no mínimo 8 caracteres."
            })
        }
    }

    return (
        <Container component="main" maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Box component="img" src="../../public/LogoPontoLocal.png" alt="Logo Ponto Local" sx={{ width: { xs: "150px", sm: "250px" }, mb: 1 }} />
                <Typography component="h1" variant="h6" sx={{ fontWeight: '600' }}>
                    Faça login em sua conta
                </Typography>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: { xs: 351, sm: 700, md: 650 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', sm: 'flex-start' }
                }}
            >
                <MuiLink component={RouterLink} to="/" variant="body2" sx={{ display: 'flex', fontWeight: 'bold', color: 'text.primary', textDecoration: 'none', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    <ArrowBack sx={{ fontSize: { xs: 16, sm: 18 }, mr: 0.5 }} />
                    Voltar à página inicial
                </MuiLink>

                <Paper
                elevation={8}
                className="p-6 md:p-20"
                sx={{ width: "100%", maxWidth: { xs: 351, sm: 700, md: 650 } }}
                    
                >
                    <form onSubmit={handleSubmit} noValidate>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                            <TextField
                                label="Email" name="email" type="email" placeholder="seu@email.com"
                                fullWidth value={formData.email} onChange={handleChange}
                                onBlur={handleBlur} error={!!errors.email} helperText={errors.email}
                                InputProps={{ startAdornment: (<InputAdornment position="start"><Email /></InputAdornment>) }}
                            />
                            <TextField
                                label="Senha" name="password" type={showPassword ? "text" : "password"}
                                placeholder="Digite sua senha" fullWidth value={formData.password}
                                onChange={handleChange} onBlur={handleBlur}
                                error={!!errors.password} helperText={errors.password}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: { sm: "space-between" }, alignItems: "center", gap: { xs: 1, sm: 0 }, mt: -1 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />}
                                    label={
                                        <Typography variant="body2" sx={{ whiteSpace: 'nowrap', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                                            Lembrar senha e manter-me logado
                                        </Typography>
                                    }
                                    sx={{ flexShrink: 0, ml: { xs: -0.1, sm: 0 } }}
                                />
                                <MuiLink component={RouterLink} to="/forgot-password" variant="body2" sx={{ color: "primary.main", fontWeight: "bold" }} >
                                    Esqueceu a senha?
                                </MuiLink>
                            </Box>
                            <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ py: 1.5 }} >Entrar</Button>
                            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                                Não tem uma conta?{" "}
                                <MuiLink component={RouterLink} to="/signup" sx={{ color: "primary.main", fontWeight: "bold" }} >Cadastre-se</MuiLink>
                            </Typography>
                            <Typography variant="body2" align="center" sx={{ color: "grey.600" }} >ou</Typography>
                            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }} >
                                <Button variant="contained" fullWidth startIcon={<Google />} sx={{ py: 1.5, bgcolor: "white", color: "black", border: "1px solid #E0E0E0", "&:hover": { bgcolor: "#f5f5f5" }, }} >Entrar com o Google</Button>
                                <Button variant="contained" fullWidth startIcon={<Facebook />} sx={{ py: 1.5, bgcolor: "white", color: "black", border: "1px solid #E0E0E0", "&:hover": { bgcolor: "#f5f5f5" }, }} >Entrar com o Facebook</Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Container>
    )
}

export default LoginPage