import React from 'react'

const Contact = () => {
  const token=localStorage.getItem('token')
  if (token === null) {
    return (
      <div>
        <p>USER IS NOT AUTHENTICATED. PLEASE AUTHENTICATE.</p>
      </div>
    );
  }
  return (
    <div>
      <h1>This is contact</h1>
    </div>
  )
}

export default Contact
