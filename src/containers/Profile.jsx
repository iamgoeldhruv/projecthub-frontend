import React from 'react'

const Profile = () => {
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
      
    </div>
  )
}

export default Profile
