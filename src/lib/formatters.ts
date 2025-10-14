
/**
 * Masks a string to CPF format (000.000.000-00).
 * @param value The string to be formatted.
 * @returns The formatted CPF string.
 */
export const maskCPF = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .slice(0, 14);
};

/**
 * Masks a string to CNPJ format (00.000.000/0000-00).
 * @param value The string to be formatted.
 * @returns The formatted CNPJ string.
 */
export const maskCNPJ = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .slice(0, 18);
};

/**
 * Masks a string to WhatsApp format ((00) 00000-0000).
 * @param value The string to be formatted.
 * @returns The formatted WhatsApp string.
 */
export const maskWhatsApp = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
};

/**
 * Masks a string to CEP format (00000-000).
 * @param value The string to be formatted.
 * @returns The formatted CEP string.
 */
export const maskCEP = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);
};