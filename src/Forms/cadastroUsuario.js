import React from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";
import './cadastro.css';
import Sidebar from "../sideBar";
import axios from 'axios';

const CadastroUser = (props) => {
    const handleSubmit = (values) => {        
        axios.post('http://localhost:8080/sigaachave/usuarios/adicionar/' +values.nome+"+"+values.password+"+"+values.tipoUsuario
         ).then(() =>alert("Deu certo")).catch(err => alert("Não foi possível cadastrar o usuário..."))
    }
    const validations = yup.object().shape({
        nome:yup.string().required("Campo nome é obrigatório"),
        password:yup.string().min(8, "Deve conter no mínimo 8 caracteres").required("Campo senha é obrigatório"),
        passwordConfirm: yup.string().oneOf([yup.ref('password'), null], "Deve ser igual ao campo senha")
        .required('Campo de confirmação de senha é obrigatório')
        
    })
   
    return(
        <Sidebar {...props} componente={
            <div className="container-cadastro"> 
                <div className="bg-form row">
                    <div className="form-fields col-12 align-self-center">
                        <div className="login-title">Cadastro de Usuário</div>
                        <Formik 
                            initialValues={{nome:"", password: "", passwordConfirm: "",tipoUsuario: "USUARIO"}}
                            onSubmit={handleSubmit}
                            validationSchema={validations}
                        >

                            <Form className="app-form">
                                <div className="row justify-content-center">
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-name">Nome:</label>
                                        <Field name="nome" className="form-control" placeholder="Nome"/>
                                        <ErrorMessage className="form-error" name="nome" component="span"/>                               
                                    </div>
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-Tipo">Tipo de usuário:</label>
                                        <Field className="form-control" component="select" name="tipoUsuario">
                                            <option value="USUARIO">Comum</option>
                                            <option value="ADMIN">Administrador</option>
                                            <option value="COORDENADOR">Coordenador</option>
                                        </Field>
                                        <ErrorMessage className="form-error" name="tipoUsuario" component="span"/>  
                                    </div>

    {/*                                <div className="form-group text-left col-6">
                                        <label className="exemple-username">Sobrenome:</label>
                                        <Field name="sobrenome" className="form-control" placeholder="Sobrenome"/>
                                        <ErrorMessage className="form-error" name="email" component="span"/>                               
                                    </div>*/}
    {/*                                <div className="form-group text-left col-12">
                                        <label className="exemple-username">E-mail:</label>
                                        <Field name="email" className="form-control" placeholder="E-mail"/>
                                        <ErrorMessage className="form-error" name="email" component="span"/>                               
                                    </div>*/}
                                    <div className="form-group text-left col-6">
                                    <label className="exemple-password">Senha:</label>
                                        <Field name="password" className="form-control" placeholder="Senha"/>
                                        <ErrorMessage className="form-error" name="password" component="span"/>
                                    </div>
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-passwordConfirm">Confirmar senha:</label>
                                        <Field name="passwordConfirm" className="form-control" placeholder="Confirmar senha"/>
                                        <ErrorMessage className="form-error" name="passwordConfirm" component="span"/>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-md" type="submit">Cadastrar</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        } />
    );
}

export default CadastroUser;