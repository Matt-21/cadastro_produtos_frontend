import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/index.js';
import Produtos from './pages/produtos/index.js';
import Pedidos from './pages/pedidos/index.js';
import TipoProdutos from './pages/tipoProdutos/index.js';
import './App.css';

function App() {
  return (
    <Router>
        <Header/>
      <Routes>
        <Route path='/' element={<Produtos/>}/>
        <Route path='/tipoProdutos' element={<TipoProdutos/>}/>
        <Route path='/pedidos' element={<Pedidos/>}/>
      </Routes>
    </Router>
  );
}

export default App;
