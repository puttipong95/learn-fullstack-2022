import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Home() {

    const [listOfPosts, setListOfPosts] = useState([])
    let history = useNavigate()

    useEffect(() => {
      axios.get('http://localhost:3001/posts')
        .then((resp) => {
        setListOfPosts(resp?.data)
      })
    }, [])

  return (
    <div className="App">
      {listOfPosts.map((value, key) => { 
        return (
          <div className='post' key={key} onClick={() => {history(`/post/${value.id}`)}}>
            <div className='title'>{value.title}</div>
            <div className='body'>{value.postText}</div>
            <div className='footer'>{value.username}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Home