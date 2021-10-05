import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Suppliers from './components/pages/Suppliers';
import Products from './components/pages/products/Products';
import Orders from './components/pages/orders/Orders';

import ProductsState from './context/products/ProductsState';
import SuppliersState from './context/suppliers/SuppliersState';
import CategoriesState from './context/categories/CategoriesState';
import OrdersState from './context/orders/OrdersState';

function App() {
  return (
    <OrdersState>
      <ProductsState>
        <SuppliersState>
          <CategoriesState>
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
          </CategoriesState>
        </SuppliersState>
      </ProductsState>
    </OrdersState>
  );
}

export default App;
