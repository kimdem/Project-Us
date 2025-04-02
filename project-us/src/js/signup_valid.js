export const validateName = (name) => {
    return name.length > 1 && name.length <= 10;
}

// 아이디 검증 (영문, 숫자 조합, 4~16자)
export const validateID = (ID) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,16}$/;
    return usernameRegex.test(ID);
};

// 비밀번호 검증 (최소 8자, 대문자, 소문자, 숫자 포함)
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%*?&+])[A-Za-z\d!@#$%*?&+]{8,}$/;
    return passwordRegex.test(password);
};

// 이메일 검증 (이메일 형식 체크)
export const validateEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};




