
/**
 * Validates the password strength.
 * Current rule: Password must be at least 8 characters long.
 * @param password The password to validate.
 * @returns 'true' if the password is valid, 'false' otherwise.
 */
export const validatePassword = (password: string): boolean => {
    if (!password) return false;
    return password.length >= 8;
};

/**
 * Checks if two passwords match.
 * @param password The first password.
 * @param confirmPassword The confirmation password.
 * @returns 'true' if the passwords are the same, 'false' otherwise.
 */
export const doPasswordsMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
};

/**
 * Validates an email address format.
 * @param email The email address to validate.
 * @returns 'true' if the email format is valid, 'false' otherwise.
 */
export const validateEmail = (email: string): boolean => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Validates a Brazilian CPF number.
 * @param cpf The CPF number as a string.
 * @returns 'true' if the CPF is valid, 'false' otherwise.
 */
export const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0; let remainder;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    return true;
};

/**
 * Validates a Brazilian CNPJ number.
 * @param cnpj The CNPJ number as a string.
 * @returns 'true' if the CNPJ is valid, 'false' otherwise.
 */
export const validateCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    let length = cnpj.length - 2; let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length); let sum = 0; let pos = length - 7;
    for (let i = length; i >= 1; i--) { sum += parseInt(numbers.charAt(length - i)) * pos--; if (pos < 2) pos = 9; }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(0))) return false;
    length = length + 1; numbers = cnpj.substring(0, length); sum = 0; pos = length - 7;
    for (let i = length; i >= 1; i--) { sum += parseInt(numbers.charAt(length - i)) * pos--; if (pos < 2) pos = 9; }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(1))) return false;
    return true;
};