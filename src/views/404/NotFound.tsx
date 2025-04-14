import { Link } from 'react-router-dom'; 
import { useApp } from '@/utils/AppContext';

const NotFound = () => {
  const { isDarkMode } = useApp();
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="text-center space-y-6 p-8">
        {/* Logo và tiêu đề */}
        <div className="flex items-center justify-center space-x-3">
          <img src={"/kayo.webp"} alt="KayO Logo" className="h-12 w-12 object-contain" />
          <h1
            className={`text-4xl font-bold tracking-tight ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            KayO
          </h1>
        </div>

        {/* Nội dung 404 */}
        <h2
          className={`text-6xl font-extrabold ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}
        >
          404
        </h2>
        <p
          className={`text-xl ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Oops! Có vẻ như tôi đã lạc vào một góc tối của vũ trụ...
        </p>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          Trang bạn tìm kiếm không tồn tại. Hãy để tôi đưa bạn về nơi an toàn!
        </p>

        {/* Nút quay lại */}
        <Link
          to="/"
          className={`inline-block py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-600'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150`}
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;