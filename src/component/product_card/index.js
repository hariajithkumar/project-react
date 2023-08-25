import { faBackward, faMinus, faPlay, faPlus, faShoppingBag, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setproductitemDetails } from '../product_list/state/select_product'
import { setaddDetails, settotalitemDetails } from '../product_list/state/select_item'
import { useNavigate } from 'react-router-dom'
import { setproductDetails } from '../product_list/state/total_product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function Product_card() {
    const { product_item} = useSelector((state)=> state.click_product);
    const { total_item } = useSelector((state)=> state.numbers_items);
    const { additems } = useSelector((state)=> state.numbers_items);
    const total_amount = product_item.map((data)=> {return data.amount})
    const final_amount = total_amount.reduce((all,amount) => all + amount , 0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const deleteitem = (id,qty,title) => {
    const updatedItems = product_item.filter(item =>
        item.id !== id
        
    );
        dispatch(setproductitemDetails(updatedItems))
        dispatch(settotalitemDetails(total_item-qty))
        dispatch(setaddDetails(additems-1))
        toast(<div><i class="fa fa-thumbs-up"></i><p>Delete item {title}</p></div>)
    };
    const increment =(id) => {
        const updatedProductItems = product_item.map(item => {
            if (item.id === id) {
              const quatity =  { ...item, qty: item.qty + 1 ,amount:item.price * item.qty + item.price};
              return quatity
            }
            return item;
          });
        
        dispatch(setproductitemDetails(updatedProductItems));
        dispatch(settotalitemDetails(total_item+1))
      };
      const decrement =(id) => {
        const updatedProductItems = product_item.map(item => {
            if (item.id === id) {
              return { ...item, qty: item.qty - 1,amount:item.price * item.qty - item.price };
            }
            return item;
          });
        
        dispatch(setproductitemDetails(updatedProductItems));
        dispatch(settotalitemDetails(total_item-1))
      };
      const back = () =>{
        navigate('/product_list')
      }
  return (
    <>
    {product_item.length<0 ? <></> : <></>}
    <button className='btn btn-warning m-3 px-5' onClick={()=>back()}><FontAwesomeIcon icon={faBackward} className='px-2'/>Back</button>
    <div className='d-flex justify-content-center'>
        <div className='text-center mb-5 border w-50 bg-secondary'>
            <h5 className='text-white'>Total number of Product : {total_item } </h5>
            <h5 className='text-white'>Total Amount : Rs.{Math.round(final_amount)}</h5>
            <button className='btn btn-success m-2'><FontAwesomeIcon icon={faShoppingBag} className='mx-2'/><b>Pay Now</b></button>
        </div>
    </div>
   
        <div className="row align-self-stretch w-75 mx-auto ms-auto">
        {product_item && product_item.map((data,index)=>{
            return (
                <div key={data.id}>
                    <div class="container view_card">
                        <div class="card dark">
                            <img src={data.image} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <div class="text-section">
                                    <h5 class="card-title">{data.title}</h5>
                                    <div><h4>Rs.{data.price}</h4></div>
                                    <button className='btn btn-primary m-3 w-25' onClick={() => decrement(data.id)}><FontAwesomeIcon icon={faMinus}/></button>
                                    <span><b>{data.qty}</b></span>
                                    <button className='btn btn-primary m-3 w-25' value={data.id} onClick={() => increment(data.id)}><FontAwesomeIcon icon={faPlus}/></button>
                                    <div className='mt-2'>
                                        <h4 className='float-start'>Rs.{Math.round(data.price) * data.qty}</h4>
                                        <button className='btn btn-danger w-25 float-end' onClick={() => deleteitem(data.id,data.qty,data.title)}><FontAwesomeIcon icon={faTrash} /></button><br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
        <ToastContainer />
    </div>
     </>
  )
}

export default Product_card