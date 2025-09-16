import { useState, useCallback } from "react"

/**
 * Hook genérico para lidar com submissões de API.
 * Ele gerencia estados de loading e erro de forma centralizada.
 * 
 * @param apiFunction Função que realiza a chamada à API (precisa retornar uma Promise).
 */
export function useApiSubmit<TArgs extends any[], TResponse>(
  apiFunction: (...args: TArgs) => Promise<TResponse>
) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (...args: TArgs): Promise<{ success: boolean; data?: TResponse; error?: string }> => {
      setIsSubmitting(true)
      setError(null)

      try {
        const response = await apiFunction(...args)
        return { success: true, data: response }
      } catch (err: any) {
        const errorMessage = err?.message || "Erro inesperado. Tente novamente."
        setError(errorMessage)
        return { success: false, error: errorMessage }
      } finally {
        setIsSubmitting(false)
      }
    },
    [apiFunction]
  )

  return { execute, isSubmitting, error }
}
