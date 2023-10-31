import React from 'react'

const Timeline = () => {
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
      <h1>tHIS IS TIMELINE</h1>
    </div>
  )
}

export default Timeline
