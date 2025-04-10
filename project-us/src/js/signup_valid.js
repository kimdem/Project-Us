export const validateName = (name) => {
    return name.length > 1 && name.length <= 10;
}

export const validateID = (ID) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,16}$/;
    return usernameRegex.test(ID);
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%*?&+])[A-Za-z\d!@#$%*?&+]{8,}$/;
    return passwordRegex.test(password);
};

export const validateEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};




