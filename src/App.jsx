import { AuthProvider } from './contexts/auth'
import Routes from './routes/Routes'

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
