// login
export interface ILoginSchema {
    email: string;
    password: string;
}

export interface ILoginResponseSchema {
    message: string;
    user: {
        _id: string;
        email: string;
        username: string;
        avatar?: string;
    };
    access_token: string;
    is_valid: boolean;      
}

// register 
export interface IRegisterSchema {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface IRegisterResponseSchema {
    message: string;
    is_valid: boolean;
}

// forgot password
export interface IForgotPasswordSchema {
    email: string;
}

export interface IForgotPasswordResponseSchema {
    message: string;
    is_valid: boolean;
}

// verify OTP
export interface IVerifyOTPSchema {
    email: string;
    otp: string;
}

export interface IVerifyOTPResponseSchema {
    message: string;
    is_valid: boolean;
}

// reset password
export interface IResetPasswordSchema {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

export interface IResetPasswordResponseSchema {
    message: string;
    is_valid: boolean;
}

export interface IGetAccountResponseSchema extends Omit<ILoginResponseSchema, "access_token"> {}

export interface IChangePasswordSchema {
    current_password: string;
    new_password: string, 
    confirm_password: string;
}

export interface IChangePasswordResponseSchema {
    message: string;
    is_valid: boolean;
}

