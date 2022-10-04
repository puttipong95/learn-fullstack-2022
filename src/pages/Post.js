import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

function Post() {

    let { id } = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const { authState } = useContext(AuthContext)
    let history = useNavigate()

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
        const headers = {headers: {accessToken: localStorage.getItem('accessToken')}}
        axios.post('http://localhost:3001/comments', data, headers)
        .then((resp) => {
            if(resp.data.error){
                alert(resp.data.error?.message)
            }else{
                const commentRoAdd = {commentBody: newComment, username: resp.data.username}
                setComments([...comments, commentRoAdd])
                setNewComment('')
            }
        })
    }

    const deleteComment = (id) => {
        const headers = {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }
        axios.delete(`http://localhost:3001/comments/${id}`, headers).then(() => {
            setComments(comments.filter((val) => {
                return val.id !== id
            }))
        })
    }

    const deletePost = async(id) => {
        const headers = { accessToken: localStorage.getItem('accessToken') }
        await axios.delete(`http://localhost:3001/posts/${id}`, { headers: headers }).then((res) => {
            res.data === 'Deleted Successfully' && history('/')
        })
    }

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className='post'>
                    <div className='title'>{post.title}</div>
                    <div className='body'>{post.postText}</div>
                    <div className='footer'>
                        {post.username}
                        { authState.username === post?.username && <button style={{marginLeft: 15}} onClick={() => deletePost(post?.id)}>Delete Post</button> }
                    </div>
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
                        return (
                        <div className='comment' key={key}>
                            {comment.commentBody}
                            <label> Username: {comment.username}</label>
                            {authState.username === comment.username && <button onClick={() => deleteComment(comment.id)}> X </button>}
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post