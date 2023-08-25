import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNewitemDetails, setTodoDetails } from './state/todo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faEdit, faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Todo() {
    const {todo_list,new_todo} = useSelector((state)=>state.todoDetails)
    // const [isTextOverlined, setIsTextOverlined] = useState(true);
    const [updateitem,setupdateItem] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const new_one = () => {
        dispatch(setTodoDetails([...todo_list,new_todo]))
        const input_text = document.getElementById("text_val")
        input_text.value = ''
    }

    const view = (id,data) => {
        document.getElementById("todo_data").style.textDecoration = 'line-through'
    }
    const edititem = () => {
        dispatch(setTodoDetails([...todo_list,updateitem]))
        const input_text = document.getElementById("text_val")
        input_text.value = ''
        setupdateItem('')
    }
    const todoDelete = (id) => {
        const delete_todo = todo_list.filter((items,index) =>
            index+1 !== id
        )
        dispatch(setTodoDetails(delete_todo))
    }
    const back = () =>{
        navigate('/product_list')
    }
  return (
    <div>
        <button className='btn btn-warning m-3 px-5' onClick={()=>back()}><FontAwesomeIcon icon={faBackward} className='mx-2'/>Back</button>
        <h1 className='text-center'>Todo List</h1>
        <div class="input-group mb-3 w-25 mx-auto">
        {updateitem.length>0 ? <><input type="text" class="form-control" id='text_val' name='item' value={updateitem} placeholder="Enter your value" onChange={(e) => setupdateItem(e.target.value)}/></> : <><input type="text" class="form-control" id='text_val' name='item' value={new_todo.new_item} placeholder="Enter your value" onChange={(e) => dispatch(setNewitemDetails(e.target.value))}/></> } 
        {updateitem.length>0 ? <><button class="btn btn-secondary" type="button" id="button-addon2" onClick={edititem}>update</button></> : <><button class="btn btn-secondary" type="button" id="button-addon2" onClick={new_one}>Add</button></>}
        </div>
        <div>
            {todo_list.length<=0 ? <><h1 className='text-center'>No any one items</h1></> : 
            <>
                <table className='table text-center table-bordered w-50 mx-auto'>
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th>Items</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {todo_list && todo_list.map((data,index) => {
                        return(
                            <>
                                <tr>
                                    <td><b>{index+1}</b></td>
                                    <td id='todo_data' value={data}  ><b>{data}</b></td>
                                    <td>
                                        {<FontAwesomeIcon icon={faEye} className='text-warning mx-5' onClick={()=>view(index,data)}/>}
                                        <FontAwesomeIcon icon={faEdit} className='text-success' onClick={()=> setupdateItem(data)}/>
                                        <FontAwesomeIcon icon={faTrash} className='mx-5 text-danger' onClick={()=>todoDelete(index+1)}/>
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
