import React, { useState } from 'react';
import { useApp } from '@/utils/AppContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/utils/constant';
import ForgotPassword from '@/components/auth/ForgotPassword';
import VerifyOTP from '@/components/auth/VerifyOTP';
import ResetPassword from '@/components/auth/ResetPassword';
import { callForgotPassword, callResetPassword, callVerifyOTP } from '@/services/AuthService';
const ForgotPasswordForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { isDarkMode } = useApp();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {    
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: formData.email,
    };
    const response = await callForgotPassword(data);
    if(response.is_valid === true){
      setStep(2);
    } else {
      console.log(response);
    }
    setIsLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: formData.email,
      otp: formData.otp,
    };
    const response = await callVerifyOTP(data);
    if(response.is_valid === true){
      setStep(3);
    } else {
      console.log(response);
    }
    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: formData.email,
      otp: formData.otp,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };
    const response = await callResetPassword(data);
    if(response.is_valid === true){
      navigate(routes.LOGIN);
    } else {
      console.log(response);
    }
    setIsLoading(false);
  };  

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ForgotPassword 
            email={formData.email}
            onEmailChange={handleChange}
            onSubmit={(e) => handleForgotPassword(e as React.FormEvent<HTMLFormElement>)}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <VerifyOTP
            otp={formData.otp}
            onOtpChange={handleChange}
            onSubmit={(e) => handleVerifyOTP(e as React.FormEvent<HTMLFormElement>)}
            onResendOtp={() => handleForgotPassword(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>)}
            isLoading={isLoading}
          />
        );
      case 3:
        return (
          <ResetPassword  
            newPassword={formData.newPassword}
            confirmPassword={formData.confirmPassword}
            onPasswordChange={handleChange}
            onSubmit={(e) => handleResetPassword(e as React.FormEvent<HTMLFormElement>) }
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center
        ${isDarkMode ? 'bg-[#232425]' : 'bg-white'}`}
    >
      <div
        className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg border
          ${isDarkMode 
            ? 'bg-[#1F1F1F] text-gray-300 border-gray-700' 
            : 'bg-[#F9F9F9] text-black border-gray-200'}`}
      >
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3">
            <img
              src={'/kayo.webp'}
              alt="KayO Logo"
              className={`w-10 h-10 rounded-full ${isDarkMode ? 'text-white' : 'text-black'}`}
            />
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              KayO
            </h1>
          </div>
          <p
            className={`mt-2 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {step === 1 && 'Nhập email để đặt lại mật khẩu'}
            {step === 2 && 'Nhập mã xác thực đã gửi đến email của bạn'}
            {step === 3 && 'Đặt lại mật khẩu mới'}
          </p>
        </div>

        {renderStep()}

        <div className="text-center text-sm">
          <p>
            <span
              onClick={() => navigate(routes.LOGIN)}
              className={`cursor-pointer ${
                isDarkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Quay lại đăng nhập
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 