// --- IMPORTS ---
import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
    Container, Paper, Typography, TextField, Button, Box, Link as MuiLink, Avatar, Alert
} from '@mui/material'
import { ArrowBack, LockOutlined, Check } from '@mui/icons-material'
import { alpha } from '@mui/material'
import { validateEmail } from '../lib/validators'
import { useApiSubmit } from '../hooks/useApiSubmit'

// --- API SIMULATION ---
/**
 * Simulates a network call to the backend to request a password reset link.
 * In a real project, this would be in `src/api/auth.service.ts`.
 * @param email The user's email address.
 */
const fakePasswordResetApiCall = (email: string): Promise<void> => {
    console.log("Simulating API call for:", email)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'erro@email.com') {
                reject(new Error('Este e-mail não foi encontrado em nossa base de dados.'))
            } else {
                resolve() // Resolves with `undefined`, which is expected for void functions
            }
        }, 1500)
    })
}

// --- COMPONENT DEFINITION ---
const ForgotPasswordPage = () => {
    // --- STATE MANAGEMENT ---
    // Manages the value of the email input field.
    const [email, setEmail] = useState('')
    // Manages the validation error message for the email field.
    const [emailError, setEmailError] = useState('')
    // Toggles the UI between the form and the success message.
    const [isSubmitted, setIsSubmitted] = useState(false)
    // Tracks if the email field has been touched to control when validation messages appear.
    const [isTouched, setIsTouched] = useState(false)
    // Manages the countdown timer for the resend button.
    const [countdown, setCountdown] = useState(60)

    // --- CUSTOM HOOKS ---
    // Manages the state for the initial form submission API call.
    const {
        execute: submitEmail,
        isSubmitting,
        error: submissionError
    } = useApiSubmit(fakePasswordResetApiCall)

    // A separate hook instance for the resend action to manage its loading state independently.
    const {
        execute: resendEmail,
        isSubmitting: isResending
    } = useApiSubmit(fakePasswordResetApiCall)

    // --- SIDE EFFECTS ---
    // This effect manages the countdown timer logic when the form has been successfully submitted.
    useEffect(() => {
        if (isSubmitted && countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [isSubmitted, countdown])

    // --- HANDLERS ---
    /**
     * Handles changes to the email input field, updating state and validating in real-time if touched.
     */
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value
        setEmail(newEmail)
        if (isTouched) {
            setEmailError(validateEmail(newEmail) ? '' : 'Por favor, insira um e-mail válido.')
        }
    }

    /**
     * Handles the blur event for the email field, marking it as touched to enable validation.
     */
    const handleBlur = () => {
        setIsTouched(true)
        if (email) {
            setEmailError(validateEmail(email) ? '' : 'Por favor, insira um e-mail válido.')
        }
    }

    /**
     * Handles the main form submission.
     * It validates the email and then uses the custom hook to execute the API call.
     */
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsTouched(true)
        if (!validateEmail(email)) {
            setEmailError('Por favor, insira um e-mail válido.')
            return
        }

        // The hook returns an object with a `success` property.
        const { success } = await submitEmail(email)

        // This condition now works correctly, even if the API returns no data on success.
        if (success) {
            setIsSubmitted(true)
        }
    }

    /**
     * Handles the "resend email" action, resetting the countdown and calling the API.
     */
    const handleResend = () => {
        setCountdown(60)
        resendEmail(email)
    }

    // --- JSX RENDER ---
    return (
        <Container component="main" maxWidth="sm" className="flex flex-col items-center justify-center w-full min-h-screen" sx={{ px: { xs: 2, sm: 0 } }}>
            <Box sx={{ width: '100%', maxWidth: '590px', display: 'flex', flexDirection: 'column' }}>
                <MuiLink component={RouterLink} to="/" variant="body2" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: 'text.primary', textDecoration: 'none', alignSelf: 'flex-start', mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    <ArrowBack sx={{ fontSize: { xs: 16, sm: 18 }, mr: 0.5 }} />
                    Voltar ao login
                </MuiLink>

                <Paper elevation={8} sx={{ p: { xs: 3, sm: 5 }, width: '100%' }}>
                    {isSubmitted ? (
                        // --- SUCCESS VIEW ---
                        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 0, sm: 2 } }}>
                            <Avatar sx={(theme) => ({bgcolor: alpha(theme.palette.success.main, 0.1),border: `1px solid ${alpha(theme.palette.success.main, 0.5)}`, width: 76, height: 76, mb: 2 })}>
                                <Check sx={{ color: 'success.main', fontSize: 40 }} />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>E-mail enviado!</Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.5, maxWidth: { xs: '90%', sm: '80%' }, mx: 'auto' }}>
                                Foi enviado um email de recuperação de senha. Acesse ele para confirma a mudança de senha.
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, color: 'error.main', fontSize: { xs: '0.75rem', sm: '0.8rem' }, lineHeight: 1.4, maxWidth: '480px', mx: 'auto' }}>
                                O email pode demorar alguns minutos. Caso não tenha chegado, verifique sua caixa de lixo eletrônico (spam). Se ainda assim não tiver recebido, clique em enviar novamente após o tempo acabar...
                            </Typography>
                            {countdown > 0 && (
                                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'normal', mb: 3 }}>
                                    {countdown} s
                                </Typography>
                            )}
                            <Button onClick={handleResend} variant="contained" fullWidth disabled={countdown > 0 || isResending} sx={{ mt: 1, py: 1.5, mb: 1 }}>
                                {isResending ? 'Reenviando...' : 'Enviar novamente'}
                            </Button>
                        </Box>
                    ) : (
                        // --- INITIAL FORM VIEW ---
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.light', width: { xs: 72, sm: 80 }, height: { xs: 72, sm: 80 } }}>
                                <LockOutlined sx={{ color: 'primary.main', fontSize: { xs: 40, sm: 48 } }} />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>Recuperar senha</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, mb: 3 }}>
                                Digite seu email para recuperar sua senha
                            </Typography>
                            <Box sx={{ width: '100%', textAlign: 'left' }}>
                                <TextField
                                    label="Email" name="email" fullWidth value={email}
                                    onChange={handleEmailChange}
                                    onBlur={handleBlur}
                                    error={!!emailError || !!submissionError}
                                    helperText={emailError || ''}
                                />
                            </Box>
                            {submissionError && (
                                <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                                    {submissionError}
                                </Alert>
                            )}
                            <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ mt: 2, py: 1.5 }}>
                                {isSubmitting ? 'Enviando...' : 'Enviar'}
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Box>
        </Container>
    )
}

export default ForgotPasswordPage

