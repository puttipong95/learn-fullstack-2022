import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function Home() {

    const [listOfPosts, setListOfPosts] = useState([])
    const { authState } = useContext(AuthContext)
    let history = useNavigate()

    useEffect(() => {

      if(!localStorage.getItem('accessToken')){
        history('/login')
      }else{
        axios.get('http://localhost:3001/posts')
          .then((resp) => {
          setListOfPosts(resp?.data)
        })
      }
      
    }, [])

    const likeAPost = (PostId) => {
      const data = {PostId}
      const headers = {headers: {accessToken: localStorage.getItem('accessToken')}}
      axios.post('http://localhost:3001/likes', data, headers)
      .then((resp) => {
        
        if(resp.data.error){
          alert(resp.data.error.message)
          return
        }

        setListOfPosts(listOfPosts.map((post) => {
          if(post.id === PostId){
            if(resp.data.liked){
              return {...post, Likes: [...post.Likes, 0]}
            }else{
              const likeArray = post.Likes
              likeArray.pop()
              return {...post, Likes: likeArray}
            }
          }else{
            return post
          }
        }))
      })
    }

  return (
    <div className="App">
      {listOfPosts.map((value, key) => { 
        return (
          <div className='post' key={key}>
            <div className='title' onClick={() => {history(`/post/${value.id}`)}}>{value.title}</div>
            <div className='body' onClick={() => {history(`/post/${value.id}`)}}>{value.postText}</div>
            <div className='footer'>
              {value.username}
              <button onClick={() => likeAPost(value.id)}> Like</button>
              <label>{value.Likes?.length}</label>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home