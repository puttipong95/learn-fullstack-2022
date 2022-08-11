import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {

  let history = useNavigate()
  const initialValues = {
        username: '',
        password: ''
    }
    
    const onSubmit = (data) => {
        axios.post('http://localhost:3001/auth', data)
          .then((resp) => {
            console.log('resp register: ', resp)
            history('/login')
          })
    }
    
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required('You must input Password!')
    })

    return (
        <div className='registerPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label>Username: </label>
                    <ErrorMessage name='username' component='span'/>
                    <Field id='username' name='username' placeholder='(Ex. Pg1955...)' autocomplete='off' />
                    <label>Password: </label>
                    <ErrorMessage name='password' component='span'/>
                    <Field id='password' name='password' placeholder='Password...' autocomplete='off' />
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Register