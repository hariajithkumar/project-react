import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShop, faTornado } from '@fortawesome/free-solid-svg-icons'
import { setproductDetails } from './state/total_product';
import { setProductlist } from './state/search_product';
import { setaddDetails, settotalitemDetails } from './state/select_item';
import { setproductitemDetails } from './state/select_product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { setLogoutDetails } from '../login/state/user_login';

function Product_list() {
  const {productDetails} = useSelector((state)=> state.product_details)
  const {search_list} = useSelector((state)=> state.search_list_view)
  const [newproduct,setnewDetails] = useState([])
  const { total_item } = useSelector((state)=> state.numbers_items)
  const {additems} = useSelector((state)=> state.numbers_items)
  const { product_item} = useSelector((state)=> state.click_product)
  const { logoutDetails} = useSelector((state)=> state.login_success)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productlist = async() => {
      const {data} = await axios.get('https://fakestoreapi.com/products');
      dispatch(setproductDetails(data))
  }
  const productsearch = () => {
      const search =  productDetails.filter((item) => 
      item.title.toLowerCase().includes(search_list.search) || item.category.toLowerCase().includes(search_list.search)
    )
    if(search.length>0){
      return search
    }else{
      return productDetails
    }
  }
  const add_items = (id,price,data) => {
        const idToFind = id
        if(product_item.length>0){
          const userExists = product_item.some(user => user.id === idToFind);
          if(userExists){
              dispatch(settotalitemDetails(total_item))
              dispatch(setaddDetails(additems))
              toast(<div><i class="fa fa-thumbs-down"></i><p>Already exist this item</p></div>)
          }else{
            dispatch(setproductitemDetails([...product_item,{...data,id,amount:price,qty:1}]))
            dispatch(settotalitemDetails(total_item+1))
            dispatch(setaddDetails(additems+1))
            toast(<div><i class="fa fa-thumbs-up"></i><p>Sucess Add new Item</p></div>)
          }
        }else{
          dispatch(setproductitemDetails([...product_item,{...data,id,amount:price,qty:1}]))
          dispatch(settotalitemDetails(total_item+1))
          dispatch(setaddDetails(additems+1))
          toast(<div><i class="fa fa-thumbs-up"></i><p>Sucess Add new Item</p></div>)

        }
      }
    const logout = () => {
      dispatch(setLogoutDetails(false))
      navigate('/')
    }
  const cart_product = () =>{
    navigate('/select_product')
  }
  console.log(logoutDetails)
  useEffect(() => {
    productlist()
    if(!logoutDetails){
      navigate('/')
    }
  }, [])
  return (
    <div className='' style={{background:'#1e4262'}}>
      <nav class="navbar navbar-expand-lg z-index-3 w-100 shadow-none navbar-transparent position-fixed top-0 bg-warning">
          <div class="container-fluid">
            <a class="navbar-brand"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png' width={100} height={60}/></a>
              <div class="d-flex">
                <Link className='mx-2' to={'/todo_list'} ><button className='btn btn-primary'>Tood</button></Link>
                <button className='btn btn-success bt-float button' onClick={()=>cart_product()}><FontAwesomeIcon icon={faShop}/></button><sup className='fs-5 fw-bold text-white'>{additems}</sup>
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(val)=> dispatch(setProductlist({...search_list,search:val.target.value}))}/>
                <button className='btn btn-danger' onClick={() => logout()}>Logout</button>
              </div>
          </div>
        </nav>
        <div className='mar-top'>
          <h1 className='text-center text-white' >Product List</h1>
          <div className='mt-5'>
            <div className="row align-self-stretch m-0">
                {productDetails && productDetails.length>0 && productsearch().map((data,index)=>{
                  return (
                    <div className="col-3 p-3 card-height mb-5 rounded">
                        
                        <div className="card" style={{background: "#5af9f9"}}>
                            <img src={data.image} className="card-img-top p-3" alt="..." />
                            <div className="card-body">
                              <h5 className="card-title">{data.title}</h5>
                              <p className="card-text">{data.description}</p>
                              <h4>Rs.{Math.round(data.price)}</h4>
                              <br/>
                              <Link to={`/product_details/${data.id}`}><button className="btn btn-primary">View Details</button></Link>
                              <button className='btn btn-primary mx-4' id={data.id} value={data.id} onClick={(id) => add_items(data.id,data.price,data)}>Add</button>
                            </div>
                          </div>
                    </div>
                  )
                })}
                <ToastContainer />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Product_list