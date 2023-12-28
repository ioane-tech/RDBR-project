import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div>
        <h2>Oops! page not found. <Link to="/">Go back</Link></h2>
    </div>
  )
}

export default ErrorPage