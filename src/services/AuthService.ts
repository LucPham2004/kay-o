import { ILoginSchema, ILoginResponseSchema, IRegisterSchema, IRegisterResponseSchema, IForgotPasswordSchema, IForgotPasswordResponseSchema, IVerifyOTPSchema, IVerifyOTPResponseSchema, IResetPasswordSchema, IResetPasswordResponseSchema, IGetAccountResponseSchema } from "@/types/Auth";
import instance from "./Axios-customize";

export const callLogin = async (data: ILoginSchema) => {
    const response = await instance.post<ILoginResponseSchema>("/api/auths/login", data);
    return response.data;
};

export const callRegister = async (data: IRegisterSchema) => {
    const response = await instance.post<IRegisterResponseSchema>("/api/auths/register", data);
    return response.data;
};

export const callForgotPassword = async (data: IForgotPasswordSchema) => {
    const response = await instance.post<IForgotPasswordResponseSchema>("/api/auths/forgot-password", data);
    return response.data;
};  

export const callVerifyOTP = async (data: IVerifyOTPSchema) => {
    const response = await instance.post<IVerifyOTPResponseSchema>("/api/auths/verify-otp", data);
    return response.data;
};

export const callResetPassword = async (data: IResetPasswordSchema) => {
    const response = await instance.post<IResetPasswordResponseSchema>("/api/auths/reset-password", data);
    return response.data;
};

export const callGetAccount = async () => {
    const response = await instance.get<IGetAccountResponseSchema>("/api/auths/getAccount");
    return response.data;
};


