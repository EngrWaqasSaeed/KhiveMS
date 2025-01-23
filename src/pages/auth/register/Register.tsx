import './Register.css'
import login from '../../../assets/images/kryptohive_logo.jpg'
import loginSide from '../../../assets/images/login.webp'
import 'animate.css'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [conPassword, setConPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Sending details to the backend
      const response = await axios.post(
        'http://localhost:3001/api/auth/register',
        {
          name,
          email,
          password,
          con_password: conPassword,
          role: 'USER'
        }
      )
      console.log(response)

      alert(
        'Registration Successful! You will now be redirected to the login page.'
      )
      setError('')
      navigate('/')
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          'Something went wrong during user registration.'
      )
      setMessage('')
    }
  }

  return (
    <div className='Main-Container flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100'>
      {/* Left Side - Form */}
      <div className='sub-container flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 md:w-1/2'>
        {/* Logo */}
        <div className='logo flex items-center justify-center mb-6'>
          <img src={login} alt='' />
        </div>

        {/* Register Form */}
        <div className='w-full max-w-md'>
          <h2 className='text-2xl font-bold text-center mb-2'>Register</h2>
          <p className='mb-4 text-gray-400 text-xs text-center'>
            Welcome Back! Please Enter your Details to sign up
          </p>
          {error && <p className='error text-red-700 font-medium'>{error}</p>}
          {message && (
            <p className='success text-green-500 font-medium'>{message}</p>
          )}

          <form onSubmit={handleRegister}>
            {/* Name Field */}
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-600'
              >
                Name:
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800'
                placeholder='Enter your email'
                required
              />
            </div>

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
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800'
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
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                }}
                name='password'
                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800'
                placeholder='Enter your password'
                required
              />
            </div>

            {/* Confirm Password */}
            <div className='mb-4'>
              <label
                htmlFor='con_password'
                className='block text-sm font-medium text-gray-600'
              >
                Confirm Password:
              </label>
              <input
                type='password'
                id='con_password'
                name='con_password'
                value={conPassword}
                onChange={e => setConPassword(e.target.value)}
                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800'
                placeholder='Enter password again'
                required
              />
            </div>

            {/* Checkbox */}
            <div className='flex items-center mb-4'>
              <input
                type='checkbox'
                id='remember'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-red-800'
              />
              <label htmlFor='remember' className='ml-2 text-sm text-gray-600'>
                Confirm Your Details
              </label>
            </div>

            {/* Register Button */}
            <button
              type='submit'
              className='animate__animated animate__shakeX w-full px-4 py-2 text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-red-800'
            >
              Register
            </button>

            <p className='text-gray-600 mt-4 text-center'>
              Already have an account?{' '}
              <a
                href='/'
                className='text-red-900 hover:underline hover:text-red-950'
              >
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Welcome Message */}
      <div className='sub-container-2 flex flex-col items-center justify-center bg-red-900 text-white p-6 rounded-lg shadow-lg mt-6 md:mt-0 md:ml-8 md:w-1/2'>
        <h1 className='text-center text-3xl font-bold'>Welcome To KHIVE!</h1>
        <p className='mt-4 text-center'>
          Please sign up to your{' '}
          <span className='underline font-bold'>KHIVE</span> account.
        </p>
        <p className='mt-4 text-center text-gray-300'>
          A software company specializes in designing, developing, and
          delivering technology solutions to meet various business and consumer
          needs.
        </p>
        <div className='animate__bounce imageDiv mt-6 flex items-center justify-center rounded-lg'>
          <img className='' src={loginSide} alt='' />
        </div>
      </div>
    </div>
  )
}

export default Register
