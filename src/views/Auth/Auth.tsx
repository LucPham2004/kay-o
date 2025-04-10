import { useLocation } from "react-router-dom"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import { routes } from "@/utils/constant"
import ForgotPasswordForm from "./ForgotPasswordForm"

const Auth = () => {
    const { pathname } = useLocation()
    const isLogin = pathname === routes.LOGIN;
    const isRegister = pathname === routes.REGISTER;
    const isForgotPassword = pathname === routes.FORGOT_PASSWORD;
  return (
    <>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
      {isForgotPassword && <ForgotPasswordForm />}
    </>
  )
}

export default Auth