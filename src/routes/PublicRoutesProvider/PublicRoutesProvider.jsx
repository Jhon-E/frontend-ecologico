import { Navigate, Route } from 'react-router-dom'
import RoutesWithNotFound from '../RoutesWithNotFound'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../utils/routes'
import LogIn from '../../pages/Public/Login'
import Register from '../../pages/Public/Register'

function PublicRoutesProvider() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PRIVATE_ROUTES.PRIVATE} />} />
      <Route path={PUBLIC_ROUTES.LOGIN} element={<LogIn />} />
      <Route path={PUBLIC_ROUTES.REGISTER} element={<Register />} />
    </RoutesWithNotFound>
  )
}
export default PublicRoutesProvider
