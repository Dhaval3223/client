import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/Auth/authSlice'
import Sppinner from '../Components/Sppinner';
import emailjs from 'emailjs-com';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      // toast.error('Password not match')
      alert('Please enter a valid password')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData));
      emailjs
        .sendForm('service_e3sxjcl', 'template_tgokeqk', e.target, '7ilO4FpszMpU2U644')
        .then( res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  return isLoading ? <Sppinner /> : (
    <>
      <section className="heading">
        <h1>
          <FaUser />Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              value={name} 
              placeholder="Enter your name" 
              onChange={OnChange} />
          </div>
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
            <input 
              type="password" 
              className="form-control" 
              name="password2" 
              value={password2} 
              placeholder="Confirm password"
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

export default Register