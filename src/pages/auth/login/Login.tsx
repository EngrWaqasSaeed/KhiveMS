import './Login.css'
import login from '../../../assets/images/login.webp'
import khive from '../../../assets/images/kryptohive_logo.jpg'
import 'animate.css'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3001/api/auth/sign', {
        email,
        password
      })
      const { token, user } = response.data
      console.log(token)
      console.log(user)

      // Store the token in localStorage
      localStorage.setItem('token', token)
      const api = 'http://localhost:3001/api/auth/sign'
      axios
        .post(
          api,
          { email, password },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(response => {
          console.log('Successfully set the header' + response.data)
        })
        .catch(error => {
          console.log(error + ' Error Occurs in Setting Header')
        })

      const { role } = response.data

      if (role === 'admin') {
        navigate('/admin')
      } else if (role === 'user') {
        navigate('/user')
      }

      setMessage('Login Successfully! Redirecting')
      setError('')
      navigate('/user')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid email or password')
      setMessage('')
    }
  }

  return (
    <div className='Main-Container flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50'>
      {/* Left Section - Login Form */}
      <div className='sub-container flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 md:w-1/2 mx-6'>
        {/* Logo */}
        <div className='logo flex items-center justify-center mb-6 '>
          <img src={khive} alt='Logo' />
        </div>

        {/* Login Form */}
        <div className='w-full max-w-md'>
          <h2 className='text-2xl font-bold text-center mb-2'>Sign In</h2>
          <p className='mb-4 text-gray-400 text-xs text-center'>
            Welcome Back! Please Enter your Details
          </p>
          {error && <p className='text-red-500 text-center'>{error}</p>}
          {message && <p className='text-green-500 text-center'>{message}</p>}

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-600'
              >
                Email:
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                name='email'
                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your email'
                required
              />
            </div>

            {/* Password Field */}
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-600'
              >
                Password:
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your password'
                required
              />
            </div>

            {/* Checkbox and Forget Password */}
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='remember'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
                />
                <label
                  htmlFor='remember'
                  className='ml-2 text-sm text-gray-600'
                >
                  Remind me
                </label>
              </div>
              <a
                href='/forget'
                className='text-sm text-red-800 hover:underline'
              >
                Forget Password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type='submit'
              className='animate__animated animate__shakeX w-full px-4 py-2 text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Sign In
            </button>
          </form>

          <p className='text-gray-600 mt-4 text-center'>
            Don't have an account?{' '}
            <a href='/register' className='text-red-800 hover:underline'>
              Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* Right Section - Welcome Message */}
      <div className='sub-container-2 flex flex-col items-center justify-center bg-red-950 text-white rounded-lg shadow-lg p-6 m-4 md:mt-0 md:ml-8 md:w-1/2'>
        <h1 className='text-center text-3xl font-bold'>Welcome Back!</h1>
        <p className='mt-4 text-center'>
          Please sign in to your{' '}
          <span className='underline font-bold '>KHIVE</span> account.
        </p>
        <p className='mt-4 text-center text-gray-300'>
          A software company specializes in designing, developing, and
          delivering technology solutions, including applications, systems, and
          services, to meet various business and consumer needs.
        </p>
        <div className='imageDiv mt-6 flex items-center justify-center rounded-lg'>
          <img src={login} alt='' />
        </div>
      </div>
    </div>
  )
}

export default Login
