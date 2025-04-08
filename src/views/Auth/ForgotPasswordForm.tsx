import React, { useState } from 'react';
import { useTheme } from '@/utils/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/utils/constant';
import ForgotPassword from '@/components/auth/ForgotPassword';
import VerifyOTP from '@/components/auth/VerifyOTP';
import ResetPassword from '@/components/auth/ResetPassword';

const ForgotPasswordForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      // TODO: Send OTP to email
      console.log('Sending OTP to:', formData.email);
      setStep(2);
    } else if (step === 2) {
      // TODO: Verify OTP
      console.log('Verifying OTP:', formData.otp);
      setStep(3);
    } else {
      // TODO: Reset password
      console.log('Resetting password:', formData.newPassword);
      navigate(routes.LOGIN);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResendOtp = () => {
    // TODO: Resend OTP to email
    console.log('Resending OTP to:', formData.email);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ForgotPassword
            email={formData.email}
            onEmailChange={handleChange}
            onSubmit={handleSubmit}
          />
        );
      case 2:
        return (
          <VerifyOTP
            otp={formData.otp}
            onOtpChange={handleChange}
            onSubmit={handleSubmit}
            onResendOtp={handleResendOtp}
          />
        );
      case 3:
        return (
          <ResetPassword
            newPassword={formData.newPassword}
            confirmPassword={formData.confirmPassword}
            onPasswordChange={handleChange}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div
        className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3">
            <img
              src={'/kayo.webp'}
              alt="KayO Logo"
              className="h-10 w-10 object-contain"
            />
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
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