import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BranchMenu from './pages/BranchMenu';

function App() {
  return (
    <Router>
      <Layout>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu/1">Branch Menu</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:branchId" element={<BranchMenu />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
