import React from 'react'
import { useParams } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { setproductId } from './state/product_view'

function Product_id_details() {
  const {product_id} = useSelector((state)=> state.product_id_details)
  const params = useParams()
  const dispatch = useDispatch()
  const productlist = async() => {
    const {data} = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
    dispatch(setproductId(data))
  }
  useEffect(()=>{
    dispatch(setproductId(params))
    productlist()
  },[])
  return (
    <div>
      <div className="col-3 p-3">
                  <div className="card h-100">
                      <img src={product_id.image} className="card-img-top" alt="..." />
                      <div className="card-body">
                          <h6>{product_id.category}</h6>
                          <h5 className="card-title">{product_id.title}</h5>
                          <p className="card-text">{product_id.description}</p>
                          <button className="btn btn-primary">{product_id.price}</button>
                      </div>
                  </div>
              </div>
    </div>
  )
}

export default Product_id_details