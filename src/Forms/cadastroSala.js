import React from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";
import './cadastro.css';
import Sidebar from "../sideBar"
import axios from 'axios';
import { getToken } from '../security/auth';

const CadastroSalas = (props) => {

    const handleSubmit = (values) => {    
        const token = getToken()      
        axios.post(`http://localhost:8080/sigaachave/sala/adicionar?nome=${values.nome}&localizacao=${values.localizacao}&descricao=${values.descricao}
         &permiteFixo=${values.permiteFixo}`, {headers: {token:token}}
         ).then(() =>alert("Deu certo")).catch(err => alert("Não foi possível cadastrar o usuário..."))
    }
    const validations = yup.object().shape({
        nome:yup.string().required("Digite um nome válido"),
        localizacao:yup.string(),
        descricao:yup.string(),
    })

    return(
        <Sidebar {...props} 
        componente={
            <div className="container-cadastro"> 
                <div className="row">
                    <div className="form-fields col-12 align-self-center">
                        <div className="login-title">Cadastrar Sala</div>
                        <Formik 
                            initialValues={{nome: "", localizacao: "", descricao: "", permiteFixo: "false"}}
                            onSubmit={handleSubmit}
                            validationSchema={validations}
                        >

                            <Form className="app-form">
                                <div className="row justify-content-center">
                                    
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-nome">Nome:</label>
                                        <Field name="nome" className="form-control" placeholder="Nome"/>
                                        <ErrorMessage className="form-error" name="nome" component="span"/>                               
                                    </div>
                                    
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-localizacao">Localização:</label>
                                        <Field name="localizacao" className="form-control" placeholder="Localização"/>
                                        <ErrorMessage className="form-error" name="data" component="span"/>
                                    </div>
                                                                        
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-Tipo">Permite cadastro fixo:</label>
                                        <Field className="form-control" component="select" name="permiteFixo">
                                            <option value="false">Não permite</option>
                                            <option value="true">Permite</option>
                                        </Field>
                                        <ErrorMessage className="form-error" name="isFixo" component="span"/>  
                                    </div>

                                    <div className="form-group text-left col-6">
                                        <label className="exemple-descricao">Descrição:</label>
                                        <Field name="descricao" component="textarea" className="form-control" placeholder="Descrição"/>
                                        <ErrorMessage className="form-error" name="descricao" component="span"/>
                                    </div>

                                    <div className="form-group text-left col-6">
                                        
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-md">Cadastrar</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div> 
        } />
    );
}

export default CadastroSalas;