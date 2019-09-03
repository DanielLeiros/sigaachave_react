import React from 'react';
import './login.css';
import logo from '../images/logo-n-bg.png';
import img from '../images/ufrn-reitoria.jpg';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";

const Login = (props) => {
    const handleSubmit = values => {
        props.history.push("/")
    }
    const validations = yup.object().shape({
        username:yup.string().required("Preencha o campo usuário"),
        password:yup.string().min(6).required("Preencha o campo senha"),
    })

    return(
        <div className="container-login">
            <div className="bg-form row">
                <div className="form-fields col-md-6 col-sm-12 align-self-center">
                    <div className="login-title">Autenticação de Usuário</div>
                    <Formik 
                        initialValues={{username: "", password:""}}
                        onSubmit={handleSubmit}
                        validationSchema={validations}
                    >

                        <Form className="app-form">
                            <div className="row justify-content-center">
                                <div className="form-group text-left col-8">
                                    <label className="exemple-username">Usuário:</label>
                                    <Field name="username" className="form-control" placeholder="Usuário"/>
                                    <ErrorMessage className="form-error" name="username" component="span"/>
                                </div>
                                <div className="form-group text-left col-8">
                                <label className="exemple-password">Senha:</label>
                                    <Field name="password" className="form-control" placeholder="Senha" type="password" default="secret"/>
                                    <ErrorMessage className="form-error" name="password" component="span"/>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-md" type="submit">Login ></button>
                        </Form>
                    </Formik>
                </div>
                <img className="logo col-6" src={logo} alt="sigaAchave" />
            </div>
        </div>
    );
}

export default Login;