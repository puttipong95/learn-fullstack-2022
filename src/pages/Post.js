import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Post() {

    let { id } = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`)
        .then((resp) => {
          setPost(resp.data)
        })

        axios.get(`http://localhost:3001/comments/${id}`)
        .then((resp) => {
            setComments(resp.data)
        })
    }, [])

    const addComment = () => {
        const data = {
            commentBody: newComment,
            PostId: id
        }
        const headers = {headers: {accessToken: sessionStorage.getItem('accessToken')}}
        axios.post('http://localhost:3001/comments', data, headers)
        .then((resp) => {
            if(resp.data.error){
                alert(resp.data.error?.message)
            }else{
                const commentRoAdd = {commentBody: newComment}
                setComments([...comments, commentRoAdd])
                setNewComment('')
            }
        })
    }

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className='post'>
                    <div className='title'>{post.title}</div>
                    <div className='body'>{post.postText}</div>
                    <div className='footer'>{post.username}</div>
                </div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input 
                        type='text' 
                        placeholder='Comment...' 
                        autoComplete='off' 
                        onChange={(e) => {setNewComment(e.target.value)}}
                        value={newComment}
                    />
                    <button onClick={addComment}> Add Comment </button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return (<div className='comment' key={key}>{comment.commentBody}</div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post