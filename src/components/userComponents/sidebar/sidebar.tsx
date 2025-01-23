import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <aside
      style={{
        width: '250px',
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        height: '85vh',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px'
      }}
    >
      <h2
        style={{
          fontSize: '1.5rem',
          marginBottom: '1rem',
          fontWeight: '600',
          color: '#2A0001'
        }}
      >
        Dashboard
      </h2>

      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        <li style={{ margin: '10px 0' }}>
          <button
            style={{
              width: '100%',
              padding: '12px',
              textAlign: 'left',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              borderRadius: '14px',
              cursor: 'pointer',
              color: '#AF1740',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={e =>
              (e.currentTarget.style.backgroundColor = '#f1f1f1')
            }
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#fff')}
            onClick={() => navigate('/user/home')} // Navigate to Home
          >
            Home
          </button>
        </li>
        <li style={{ margin: '10px 0' }}>
          <button
            style={{
              width: '100%',
              padding: '12px',
              textAlign: 'left',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              borderRadius: '14px',
              cursor: 'pointer',
              color: '#AF1740',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={e =>
              (e.currentTarget.style.backgroundColor = '#f1f1f1')
            }
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#fff')}
            onClick={() => navigate('/user/about')} // Navigate to About
          >
            Activity
          </button>
        </li>
        <li style={{ margin: '10px 0' }}>
          <button
            style={{
              width: '100%',
              padding: '12px',
              textAlign: 'left',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              borderRadius: '14px',
              cursor: 'pointer',
              color: '#AF1740',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={e =>
              (e.currentTarget.style.backgroundColor = '#f1f1f1')
            }
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#fff')}
            onClick={() => navigate('/user/profile')} // Navigate to Profile
          >
            Profile
          </button>
        </li>
        <li style={{ margin: '10px 0' }}>
          <button
            style={{
              width: '100%',
              padding: '12px',
              textAlign: 'left',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              borderRadius: '14px',
              cursor: 'pointer',
              color: '#AF1740',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={e =>
              (e.currentTarget.style.backgroundColor = '#f1f1f1')
            }
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#fff')}
            onClick={() => navigate('/user/profile/edit')} // Navigate to Settings
          >
            Settings
          </button>
        </li>
        <li style={{ margin: '10px 0' }}>
          <button
            style={{
              width: '100%',
              padding: '12px',
              textAlign: 'left',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              borderRadius: '14px',
              cursor: 'pointer',
              color: '#AF1740',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={e =>
              (e.currentTarget.style.backgroundColor = '#f1f1f1')
            }
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#fff')}
            onClick={() => navigate('/')} // Navigate to Logout (Home)
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
