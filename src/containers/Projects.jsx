import React from 'react'

const Projects = () => {
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
      <h1>This is project</h1>
    </div>
  )
}

export default Projects
