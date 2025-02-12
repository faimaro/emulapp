import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Provider } from 'react-redux';
import { store } from './store';

const Home = lazy(() => import('./pages/Home'));
const BranchMenu = lazy(() => import('./pages/BranchMenu'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu/:branchId" element={<BranchMenu />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
