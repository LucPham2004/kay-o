import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from '@/utils/constant'
import Auth from '@/views/Auth/Auth'
import HomePage from '@/views/Home/HomePage'
import NotFound from '@/views/404/NotFound'
import Home from '@/components/home/Home'
import Conversation from '@/components/home/Conversation'
import ForgotPasswordForm from '@/views/Auth/ForgotPasswordForm'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.DEFAULT} element={<HomePage />} >
          <Route path={routes.DEFAULT} element={<Home />} />
          <Route path={routes.CONVERSATIONS} element={<Conversation />} />
        </Route>
        <Route path={routes.LOGIN} element={<Auth />} />
        <Route path={routes.REGISTER} element={<Auth />} />
        <Route path={routes.FORGOT_PASSWORD} element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
   </BrowserRouter>
  )
}

export default Router