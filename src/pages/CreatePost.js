import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreatePost() {

  let history = useNavigate()
  const initialValues = {
    title: '',
    postText: '',
    username: ''
  }

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/posts', data)
      .then((resp) => {
        console.log('resp', resp)
        history('/')
      })
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must input a Title!'),
    postText: Yup.string().required('You must input Post!'),
    username: Yup.string().min(3).max(15).required()
  })

  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label>Title: </label>
          <ErrorMessage name='title' component='span'/>
          <Field id='title' name='title' placeholder='(Ex. Title...)' />
          <label>Post: </label>
          <ErrorMessage name='postText' component='span'/>
          <Field id='postText' name='postText' placeholder='(Ex. Post...)' />
          <label>Username: </label>
          <ErrorMessage name='username' component='span'/>
          <Field id='username' name='username' placeholder='(Ex. Pg1955...)' />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost