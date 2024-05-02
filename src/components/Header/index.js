import { Link } from 'react-router-dom';

function Header () {
  return (
    <header>
      <div className="content" style={{ fontSize: '1.2rem', fontFamily: 'cursive'}}>
          <nav>
            <ul>
              <li><Link to='/'>Produtos</Link></li>
              <li><Link to='/tipoProdutos'>Tipo de Produtos</Link></li>
              <li><Link to='/pedidos'>Pedidos</Link></li>
            </ul>
          </nav>
      </div>
    </header>
  );
}

export default Header;