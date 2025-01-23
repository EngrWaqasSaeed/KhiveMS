import React from 'react'

const Menu: React.FC = () => {
  return (
    <nav style={{ backgroundColor: '#ffc107', padding: '0.5rem' }}>
      <ul
        style={{
          display: 'flex',
          listStyleType: 'none',
          margin: 0,
          padding: 0
        }}
      >
        <li style={{ margin: '0 1rem' }}>
          <a href='#home'>Home</a>
        </li>
        <li style={{ margin: '0 1rem' }}>
          <a href='#about'>About</a>
        </li>
        <li style={{ margin: '0 1rem' }}>
          <a href='#services'>Services</a>
        </li>
        <li style={{ margin: '0 1rem' }}>
          <a href='#contact'>Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
