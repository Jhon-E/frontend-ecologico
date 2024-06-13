import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PrivateRoutesProvider from './PrivateRoutesProvider'
import RoutesWithNotFound from './RoutesWithNotFound'
import useAuth from '../hooks/useAuth'
import { PRIVATE_ROUTES } from '../utils/routes'
import PublicRoutesProvider from './PublicRoutesProvider/PublicRoutesProvider'

function Routes() {
  const { token } = useAuth()
  return (
    <Router>
      <RoutesWithNotFound>
        <Route element={<ProtectedRoute isAllowed={!token} redirectTo={PRIVATE_ROUTES.PRIVATE} />}>
          <Route path='/*' element={<PublicRoutesProvider />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!token} />}>
          <Route path={`${PRIVATE_ROUTES.PRIVATE}/*`} element={<PrivateRoutesProvider />} />
        </Route>
      </RoutesWithNotFound>
    </Router>
  )
}
export default Routes