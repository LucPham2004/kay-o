import React, { useState, useEffect } from 'react';
import { useApp } from '@/utils/AppContext';

interface VerifyOTPProps {
  otp: string;
  onOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onResendOtp: () => void;
  isLoading: boolean;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ otp, onOtpChange, onSubmit, onResendOtp, isLoading  }) => {
  const { isDarkMode } = useApp();
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResendClick = () => {
    if (canResend) {
      onResendOtp();
      setCountdown(180);
      setCanResend(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="otp"
          className={`block text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Mã xác thực
        </label>
        <input
          id="otp"
          name="otp"
          type="text"
          required
          className={`mt-1 w-full px-4 py-3 rounded-md border ${
            isDarkMode
              ? 'bg-[#232425] border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600'
            } focus:outline-none focus:ring-2
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          placeholder="Nhập mã xác thực"
          value={otp}
          onChange={onOtpChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleResendClick}
          disabled={!canResend}
          className={`text-sm ${
            canResend
              ? isDarkMode
                ? 'text-blue-400 hover:text-blue-300'
                : 'text-blue-600 hover:text-blue-500'
              : isDarkMode
              ? 'text-gray-500'
              : 'text-gray-400'
          }`}
        >
          {canResend ? 'Gửi lại mã' : `Gửi lại sau ${formatTime(countdown)}`}
        </button>
      </div>

      <div>
        <button
          type="submit"
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-600'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          Xác thực
        </button>
      </div>
    </form>
  );
};

export default VerifyOTP;
