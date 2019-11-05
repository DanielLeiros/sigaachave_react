import React, {useState, useEffect} from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";
import './cadastro.css';
import Sidebar from "../sideBar"
import axios from 'axios';
import { getToken } from '../security/auth';

const CadastroChamado = (props) => {

    const [salas, setSalas] = useState([]);

    useEffect(()=>{
        getSalas();
    },[])

    const getSalas = () => {
        const token = getToken()
        axios.get('http://localhost:8080/sigaachave/salas')
        .then(response => setSalas(response.data))
        .catch(err => alert("Não foi possível encontrar salas..."))    
    }

    const handleSubmit = (values) => {
        const token = getToken()        
        console.log(values.sala)
        axios({method:'post', url:`http://localhost:8080/sigaachave/chamado/adicionar?idUsuario=1&sala=${values.sala}&descricao=${values.descricao}`}
         ).then(() =>alert("Deu certo")).catch(err => alert("Não foi possível registrar o chamado..."))
    }

    const validations = yup.object().shape({
        sala:yup.string().required("Insira uma sala válida"),
        descricao:yup.string().required(),
    })

    return(
        <Sidebar {...props} 
        componente={
            <div className="container-cadastro"> 
                <div className="row">
                    <div className="form-fields col-12 align-self-center">
                        <div className="login-title">Abrir Chamado</div>
                        <Formik 
                            initialValues={{sala: "", descricao: ""}}
                            onSubmit={handleSubmit}
                            validationSchema={validations}
                        >

                            <Form className="app-form">
                                <div className="row justify-content-center">
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-sala">Sala:</label>
                                        <Field name="sala" className="form-control" component="select">
                                            {salas.map((element, index) => {
                                                return <option key={index} value={element.nome}>{element.nome}</option>  
                                            })}    
                                        </Field>
                                        <ErrorMessage className="form-error" name="sala" component="span"/>                               
                                    </div>
                                   <div className="form-group text-left col-6">
                                        <label className="exemple-descricao">Descrição:</label>
                                        <Field name="descricao" className="form-control" type="text-area" placeholder="Descrição"/>
                                        <ErrorMessage className="form-error" name="descricao" component="span"/>                               
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

export default CadastroChamado;