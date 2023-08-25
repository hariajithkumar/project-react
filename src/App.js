import './App.css';
import {
  BrowserRouter,Routes,Route
}  from 'react-router-dom'
import Product_list from './component/product_list';
import Product_id_details from './component/product_id_details';
import Product_card from './component/product_card';
import Login from './component/login';
import Todo from './component/todo';
import { useSelector } from 'react-redux';


function App() {
  const { logoutDetails } = useSelector((state)=>state.login_success)
  return (
    <BrowserRouter>
      <Routes>
          <>
            <Route path='/' element={<Login />} />
            <Route path='/product_list' element={<Product_list />} />
            <Route path='product_details/:id' element={<Product_id_details />}/>
            <Route path='/select_product' element={<Product_card />} />
            <Route path='/todo_list' element={<Todo /> } />
          </> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
