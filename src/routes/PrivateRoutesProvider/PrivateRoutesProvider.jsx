import { Navigate, Route } from 'react-router-dom'
import RoutesWithNotFound from '../RoutesWithNotFound'
import Home from '../../pages/Private/Home/Home'
import { PRIVATE_ROUTES } from '../../utils/routes'
import Product from '../../pages/Private/Product'
import { CartProvider } from '../../contexts/cart'
import Cart from '../../pages/Private/Cart/Cart'
import SellProduct from '../../pages/Private/SellProduct'
import Order from '../../pages/Private/Order'
import Sales from '../../pages/Private/products_sales'

function PrivateRoutesProvider() {
  return (
    <CartProvider>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={PRIVATE_ROUTES.HOME} />} />
        <Route path={PRIVATE_ROUTES.HOME} element={<Home />} />
        <Route path={`${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.PRODUCT}`} element={<Product />} />
        <Route path={`${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.CART}`} element={<Cart />} />
        <Route path={`${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.SELL}`} element={<SellProduct />} />
        <Route path={`${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.ORDER_PAGE}`} element={<Order />} />
        <Route path={`${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.SALES}`} element={<Sales />} />
      </RoutesWithNotFound>
    </CartProvider>
  )
}
export default PrivateRoutesProvider
