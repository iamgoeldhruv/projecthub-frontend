import React from 'react'

const NewProjectform = () => {
    const token = localStorage.getItem('token');

  if (token === null) {
    return (
      <div>
        <p>USER IS NOT AUTHENTICATED. PLEASE AUTHENTICATE.</p>
      </div>
    );
    }
  return (
    <div>
      <h1>Hi</h1>
    </div>
  )
}

export default NewProjectform