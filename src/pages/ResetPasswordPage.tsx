// --- IMPORTS ---
import { useState } from 'react'
import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    Container, Paper, Typography, TextField, Button, Box, Alert, IconButton, InputAdornment
} from '@mui/material'
import { LockOutlined, Visibility, VisibilityOff, CheckCircleOutline } from '@mui/icons-material'
import { validatePassword, doPasswordsMatch } from '../lib/validators'
import { useApiSubmit } from '../hooks/useApiSubmit.ts'

// --- API SIMULATION ---
/**
 * Simulates a network call to the backend to reset the password.
 * In a real project, this would make an HTTP call (e.g., with axios or fetch).
 * @param token The password reset token from the URL.
 * @param newPassword The new password provided by the user.
 */
const fakeResetApiCall = (token: string, newPassword: string): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate an error if the token is not the expected 'VALID_TOKEN'
            if (token !== 'VALID_TOKEN') {
                reject(new Error('Link de recuperação inválido ou expirado. Por favor, solicite um novo.'))
            } else {
                // To test a valid flow, use this URL: http://localhost:5173/reset-password?token=VALID_TOKEN
                console.log("Password reset for token:", token, "with new password:", newPassword)
                resolve({ message: 'Senha atualizada com sucesso!' })
            }
        }, 1500)
    })
}

// --- TYPE DEFINITIONS ---
type FieldName = 'password' | 'confirmPassword'

// --- COMPONENT DEFINITION ---
const ResetPasswordPage = () => {
    // --- REACT & ROUTER HOOKS ---
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    // --- STATE MANAGEMENT ---
    // State for form fields and UI control (visibility, success screen)
    const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' })
    const [errors, setErrors] = useState({ password: '', confirmPassword: '' })
    const [showVisibility, setShowVisibility] = useState({ password: false, confirmPassword: false })
    const [touched, setTouched] = useState({ password: false, confirmPassword: false })
    const [isSuccess, setIsSuccess] = useState(false)
    
    // --- CUSTOM HOOK FOR API SUBMISSION ---
    // This hook encapsulates the logic for loading and error states for the API call.
    const { 
      execute: submitNewPassword, 
      isSubmitting, 
      error: submissionError 
    } = useApiSubmit(fakeResetApiCall)

    const token = searchParams.get('token')

    // --- HANDLERS ---
    /**
     * Validates a specific field and returns an error message if invalid.
     * @param name The name of the field to validate.
     * @param values The current values of the password fields.
     */
    const validateField = (name: FieldName, values: typeof passwords): string => {
        if (name === 'password') {
            if (!validatePassword(values.password)) {
                return 'A senha deve ter no mínimo 8 caracteres.'
            }
        }
        if (name === 'confirmPassword') {
            if (!doPasswordsMatch(values.password, values.confirmPassword)) {
                return 'As senhas não coincidem.'
            }
        }
        // Also re-validates confirmPassword if the main password changes to ensure they still match.
        if (name === 'password' && values.confirmPassword) {
             if (!doPasswordsMatch(values.password, values.confirmPassword)) {
                setErrors(prev => ({...prev, confirmPassword: 'As senhas não coincidem.'}))
            } else {
                 setErrors(prev => ({...prev, confirmPassword: ''}))
             }
        }
        return ''
    }

    /**
     * Updates the form state as the user types in the input fields.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: FieldName, value: string }
        const newPasswords = { ...passwords, [name]: value }
        setPasswords(newPasswords)
        // Provides real-time validation feedback after the field has been touched once.
        if (touched[name]) {
            const error = validateField(name, newPasswords)
            setErrors(prev => ({ ...prev, [name]: error }))
        }
    }

    /**
     * Marks a field as "touched" and triggers validation when the user clicks away from it.
     */
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target as { name: FieldName }
        if (!touched[name]) {
            setTouched(prev => ({ ...prev, [name]: true }))
        }
        const error = validateField(name, passwords)
        setErrors(prev => ({ ...prev, [name]: error }))
    }

    /**
     * Handles the final form submission process.
     */
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setTouched({ password: true, confirmPassword: true }) // Mark all as touched for final validation

        const passwordError = validateField('password', passwords)
        const confirmPasswordError = validateField('confirmPassword', passwords)
        setErrors({ password: passwordError, confirmPassword: confirmPasswordError })

        if (passwordError || confirmPasswordError) return

        if (!token) {
            // Pre-submission validation. In a real app, this page might redirect if no token is present.
            alert("Token de recuperação não encontrado.")
            return
        }
        
        // Executes the API call using our custom hook.
        // The hook handles setting `isSubmitting` and `submissionError` automatically.
        const { success } = await submitNewPassword(token, passwords.password)

        if (success) {
            setIsSuccess(true)
        }
    }

    // --- JSX RENDER ---
    return (
        <Container component="main" maxWidth="sm" sx={{ px: { xs: 2, sm: 0 } }}>
            <Paper elevation={8} sx={{ p: { xs: 3, sm: 5 }, width: '100%', maxWidth: '590px', mx: 'auto' }}>
                {isSuccess ? (
                    // --- SUCCESS VIEW ---
                    // This view is shown after the password has been successfully reset.
                    <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2 }}>
                        <CheckCircleOutline sx={{ fontSize: 60, color: 'success.main' }} />
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>Senha Atualizada!</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>Sua senha foi redefinida com sucesso.</Typography>
                        <Button onClick={() => navigate('/')} variant="contained" fullWidth sx={{ mt: 2, py: 1.5 }}>
                            Ir para o Login
                        </Button>
                    </Box>
                ) : (
                    // --- INITIAL FORM VIEW ---
                    // This view is shown initially for the user to enter their new password.
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>Recuperar senha</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, mb: 3 }}>Crie sua nova senha.</Typography>

                        <TextField
                            label="Senha" name="password" type={showVisibility.password ? 'text' : 'password'}
                            placeholder='Digite sua nova senha' fullWidth value={passwords.password}
                            onChange={handleChange} onBlur={handleBlur}
                            error={!!errors.password} helperText={errors.password}
                            sx={{ mb: 2 }}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><LockOutlined /></InputAdornment>),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowVisibility(p => ({ ...p, password: !p.password }))} edge="end">
                                            {showVisibility.password ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <TextField
                            label="Confirmar senha" name="confirmPassword" type={showVisibility.confirmPassword ? 'text' : 'password'}
                            placeholder='Confirme sua nova senha' fullWidth value={passwords.confirmPassword}
                            onChange={handleChange} onBlur={handleBlur}
                            error={!!errors.confirmPassword} helperText={errors.confirmPassword}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><LockOutlined /></InputAdornment>),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowVisibility(p => ({ ...p, confirmPassword: !p.confirmPassword }))} edge="end">
                                            {showVisibility.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        {submissionError && (
                            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                                {submissionError}
                            </Alert>
                        )}

                        <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ mt: 3, py: 1.5 }}>
                            {isSubmitting ? 'Atualizando...' : 'Atualizar Senha'}
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    )
}

export default ResetPasswordPage

