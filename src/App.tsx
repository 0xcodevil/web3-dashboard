import WagmiProvider from "./providers/WagmiProvider"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <WagmiProvider>
      <Dashboard />
    </WagmiProvider>
  )
}

export default App
