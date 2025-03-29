import { useLocation } from "react-router-dom"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import { routes } from "@/utils/constant"

const Auth = () => {
    const { pathname } = useLocation()
    const isLogin = pathname === routes.LOGIN
    const isRegister = pathname === routes.REGISTER

  return (
    <>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </>
  )
}

export default Auth