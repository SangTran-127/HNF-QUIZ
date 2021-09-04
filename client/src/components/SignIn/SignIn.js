import React, { useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { PinDropSharp } from '@material-ui/icons';
import './SignIn.css'
import { showErrorToast, showSuccessToast } from '../utils/tool';
import { firebase } from '../../firebase.js'
const SignIn = (props) => {
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: 'sang@gmail.com',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('The email is required'),
            password: Yup.string()
                .required('The password is required')
        }),
        onSubmit: (values) => {
            setLoading(true)
            submitForm(values)
        }
    })
    const submitForm = (values) => {
        firebase.auth()
            .signInWithEmailAndPassword(
                values.email,
                values.password
            ).then(() => {
                // show success toast
                showSuccessToast('welcome')
                props.history.push('/dashboard');
            }).catch(error => {
                setLoading(false);
                showErrorToast(error.message)
                // alert(error)
                /// show toasts
            })
        console.log(values);
    }
    return (
        <div id="login">
            <div className="container center">
                <div className="signin_wrapper">

                    <form onSubmit={formik.handleSubmit}>
                        <h2>Please login</h2>
                        <input
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div className="error_label">
                                {formik.errors.email}
                            </div>
                            : null}
                        <input
                            className="form-control mt-3"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div className="error_label">
                                {formik.errors.password}
                            </div>
                            : null}


                        {loading ?
                            <CircularProgress color="secondary" className="mt-3" />
                            :
                            <button className="btn btn-primary mt-3">Log in</button>
                        }


                    </form>

                </div>
            </div>
        </div>
    )
}

export default SignIn
