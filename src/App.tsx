import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BranchMenu from './pages/BranchMenu';
import OrderConfirmation from './pages/OrderConfirmation';
import RestaurantMenu from './pages/RestaurantMenu';
import RestaurantLanding from './pages/BranchLanding';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu/:branchId" element={<BranchMenu />} />
            <Route path="/order/confirm" element={<OrderConfirmation />} />
            <Route path="/restaurant/:id" element={<RestaurantLanding />} />
            <Route path="/restaurant/:id/menu" element={<RestaurantMenu />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
