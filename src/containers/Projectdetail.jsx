import React from 'react'
import { useParams } from 'react-router-dom';


const Projectdetail = () => {
    // const urlSearchString = window.location.search;

    // const params = new URLSearchParams(urlSearchString);
    // var projectId=params.get('projectId')
    const params = useParams();
  const projectId = params.projectId;
    console.log(`id is=${projectId}`)

  return (
    <div>
        <h1>{projectId}</h1>
      
    </div>
  )
}

export default Projectdetail
