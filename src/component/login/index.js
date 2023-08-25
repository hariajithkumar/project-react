import { useDispatch, useSelector } from 'react-redux'
import { setLoginDetails, setLogoutDetails } from './state/user_login'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeDropper, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
function Login() {
  const {login_details,logoutDetails} = useSelector((state)=>state.login_success)
  const [see,setNotsee] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const login_process = () => {
    if(login_details.email == "kumar" && login_details.password == "kumar"){
      dispatch(setLogoutDetails(true))
      navigate('/product_list')
    }else{
      alert("Error")
      navigate('/')
    }
  }
  const mouseoverPass = () => {
    let obj = document.getElementById('myPassword');
    obj.type = 'text';
    setNotsee(false)
  }
  const  mouseoutPass= () => {
    let obj = document.getElementById('myPassword');
    obj.type = 'password';
    setNotsee(true)
  }
  console.log(logoutDetails)
  
  return (
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title text-center">Login</h4>
              </div>
              <div class="card-body">
                <form>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter your email" onChange={(val) => dispatch(setLoginDetails({...login_details,email:val.target.value})) }/>
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control password" id="myPassword" placeholder="Enter your password" onChange={(val) => dispatch(setLoginDetails({...login_details,password:val.target.value})) } />
                    {see==true ? (<><FontAwesomeIcon icon={faEyeSlash} onClick={()=> mouseoverPass()} className='icon'/></>) : (<><FontAwesomeIcon icon={faEye} onClick={()=> mouseoutPass()} className='icon'/></>) }
                  </div>
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember" />
                    <label class="form-check-label" for="remember">Remember me</label>
                  </div>
                  <button type="submit" class="btn btn-primary w-100" onClick={() => login_process()}>Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login