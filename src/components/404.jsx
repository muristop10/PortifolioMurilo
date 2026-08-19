import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/">Go to home</Link>
    </div>
  )
}

export default NotFound