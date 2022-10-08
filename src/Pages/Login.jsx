import { useState, useEffect } from 'react'
import { FaSignInAlt  } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { login, reset } from '../features/Auth/authSlice'
import Sppinner from '../Components/Sppinner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);

  useEffect(() => {
    if (isError) {
      // toast.error(message)
      alert(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }
    
    dispatch(reset())
  }, [isSuccess, isError, message, user, navigate, dispatch]);

  const OnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email, 
      password,
    }

    dispatch(login(userData))
  }

  return isLoading ? <Sppinner /> : (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />Login
        </h1>
        <p>Login into account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={email}
              placeholder="Enter email address" 
              onChange={OnChange} />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              value={password} 
              placeholder="Enter password"
              onChange={OnChange} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login