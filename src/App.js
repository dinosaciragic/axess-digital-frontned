import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Suppliers from './components/pages/Suppliers';
import Products from './components/pages/Products';
import Orders from './components/pages/Orders';

import ProductsState from './context/products/ProductsState';

function App() {
  return (
    <ProductsState>
      <Router>
        <Navbar />

        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/suppliers' component={Suppliers} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/orders' component={Orders} />
          </Switch>
        </div>
      </Router>
    </ProductsState>
  );
}

export default App;