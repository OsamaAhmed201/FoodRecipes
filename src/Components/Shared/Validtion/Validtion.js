export const EMAIL_VALIDTION = {
    required: 'email is require', pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Email not vailed, please enter email valied'
    }
}
export const PASSWORD_VALIDTION = {
    required: 'password is require', pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
        message: 'The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character  '
    }
}

export const CONFIRM_PASSWORD_VALIDTION = {
    required: 'Please confirm your password',
    validate: (value) => value === watch('password') || 'Passwords do not match',
}