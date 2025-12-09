export type NewUser = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string,
    role:string
}

export type UserOTP = {
    email: string;
    OTP: string;
}