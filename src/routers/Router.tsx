import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from '@/utils/constant'
import Auth from '@/views/Auth/Auth'
import HomePage from '@/views/Home/HomePage'
import NotFound from '@/views/404/NotFound'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.DEFAULT} element={<HomePage />} />
        <Route path={routes.LOGIN} element={<Auth />} />
        <Route path={routes.REGISTER} element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
   </BrowserRouter>
  )
}

export default Router