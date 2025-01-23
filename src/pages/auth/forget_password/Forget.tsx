import './Forget.css'
import login from '../../../assets/images/login.webp'
import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom'
const Forget = () => {
  return (
    <div className='Main-Container flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50'>
      {/* Left Section - Login Form */}
      <div className='sub-container flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 md:w-1/2 mx-6'>
        {/* Logo */}
        <div className='logo flex items-center justify-center mb-6'>
          <img src={logo} alt='Logo' />
        </div>

        {/* Login Form */}
        <div className='w-full max-w-md'>
          <h2 className='text-2xl font-bold text-center mb-2'>
            Forget Password
          </h2>
          <p className='mb-4 text-gray-400 text-xs text-center'>
            Welcome Back! Please Enter your new password
          </p>

          <form>
            {/* Email Field */}
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-600'
              >
                New Password:
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your new Password'
                required
              />
            </div>

            {/* Password Field */}
            <div className='mb-4'>
              <label
                htmlFor='con_password'
                className='block text-sm font-medium text-gray-600'
              >
                Conform Password:
              </label>
              <input
                type='password'
                id='con_password'
                name='con_password'
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
              <Link
                to='/login'
                className='text-sm text-blue-500 hover:underline'
              >
                Sign in Now?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type='submit'
              className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Update Password
            </button>
          </form>

          <p className='text-gray-600 mt-4 text-center'>
            Don't want to change password{' '}
            <Link to='/' className='text-blue-600 hover:underline'>
              Login Now
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Welcome Message */}
      <div className='sub-container-2 flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg shadow-lg p-6 m-4 md:mt-0 md:ml-8 md:w-1/2'>
        <h1 className='text-center text-3xl font-bold'>Welcome Back!</h1>
        <p className='mt-4 text-center'>
          Please sign in to your{' '}
          <span className='underline font-bold'>KHIVE</span> account.
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

export default Forget
