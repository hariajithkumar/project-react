import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTodoDetails, setfinaltodoDetails } from './state/todo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faEdit, faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Todo() {
    const {todo_list,final_todo} = useSelector((state)=>state.todoDetails)
    const [todoSearch, settodoSearch] = useState('');
    const [updateitem,setupdateItem] = useState({id:'',value:''})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const back = () =>{
        navigate('/product_list')
    }
    const add_one = () => {
        const input_value = document.getElementById('text_val').value
        dispatch(setfinaltodoDetails([...final_todo,{id:final_todo.length+1,new_one:input_value}]))
        const input_text = document.getElementById("text_val")
        input_text.value = ''
    }
    const editItem = (data) =>{
        setupdateItem({id:data.id,value:data.new_one})
    }
    
    const update_one = () => {
        const id = updateitem.id
        const new_one = updateitem.value
        const final_update = final_todo.map((todo)=>{
            return todo.id == id ? {id,new_one} : todo;
        })
        dispatch(setfinaltodoDetails(final_update))
        setupdateItem({id:"",value:''})
        const input_text = document.getElementById("text_val")
        input_text.value = ''
    }
    const todoDelete = (id) => {
        const delete_id = final_todo.filter((item)=>
            item.id !== id
        )
        dispatch(setfinaltodoDetails(delete_id))
    }
    const searchTodo = () => {
        const search = final_todo.filter((item)=>
            item.new_one.toLowerCase().includes(todoSearch)
        )
       if(search.length>0){
            return search
       }else{
        return final_todo
       }
    }
    console.log(todoSearch)
  return (
    <div>
        <button className='btn btn-warning m-3 px-5' onClick={()=>back()}><FontAwesomeIcon icon={faBackward} className='mx-2'/>Back</button>
        <h1 className='text-center'>Todo List</h1>
        <div class="input-group mb-3 w-25 mx-auto">
            {updateitem.value.length>0 ? <><input type="text" class="form-control" id='text_val' name='item' value={updateitem.value}  placeholder="Enter your value" onChange={(e) => setupdateItem({id:updateitem.id,value:e.target.value})}/></> : <><input type="text" class="form-control" id='text_val' name='item' value={todo_list.new_todo}  placeholder="Enter your value" onChange={(e) => dispatch(setTodoDetails({new_one:e.target.value}))}/></>}
            {updateitem.value.length>0 ? <><button class="btn btn-secondary" type="button" id="button-addon2" onClick={update_one}>update</button></> : <><button class="btn btn-secondary" type="button" id="button-addon2" onClick={add_one}>add</button></>}
        </div>
        <div>
            {final_todo.length<=0 ? <><h1 className='text-center'>No any one items</h1></> : 
            <>
                <input type='search' className='form-control w-25 mx-auto mb-3' placeholder='Enter your search item' value={todoSearch} onChange={(e)=>settodoSearch(e.target.value)}/>
                <table className='table text-center table-bordered w-50 mx-auto'>
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th>Items</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {final_todo && final_todo.length>0 && searchTodo().map((data,index) => {
                        return(
                            <>
                                <tr>
                                    <td><b>{index+1}</b></td>
                                    <td id='todo_data' value={data.new_one}  ><b>{data.new_one}</b></td>
                                    <td>
                                        {/* {<FontAwesomeIcon icon={faEye} className='text-warning mx-5' onClick={()=>view(index,data)}/>} */}
                                        <FontAwesomeIcon icon={faEdit} className='text-success' onClick={()=> editItem(data)}/>
                                        <FontAwesomeIcon icon={faTrash} className='mx-5 text-danger' onClick={()=>todoDelete(data.id)}/>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
                </table>
            </>
            }
        </div>
    </div>
  )
}

export default Todo
