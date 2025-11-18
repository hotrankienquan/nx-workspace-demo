export const PATTERN_MAP = {
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email format'
    },
    phone: {
        regex: /^\+?(\d[\s-]?){8,15}$/,
        message: 'Invalid phone number format. Must be 8-15 digits'
    },
    string: {
        regex: /^[A-Za-z]+$/,
        message: 'Must contain only letters'
    }
};
