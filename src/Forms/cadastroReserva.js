import React, {useState, useEffect} from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";
import './cadastro.css';
import Sidebar from "../sideBar"
import axios from 'axios';

const CadastroReserva = (props) => {

    const [salas, setSalas] = useState([]);

    useEffect(()=>{
        getSalas();
    },[])

    const getSalas = () => {
        axios.get('http://localhost:8080/sigaachave/salas')
        .then(response => setSalas(response.data))
        .catch(err => alert("Não foi possível encontrar salas..."))    
    }

    const handleSubmit = (values) => {        
        axios.post('http://localhost:8080/sigaachave/reservas/adicionar/' +values.sala+"+"+values.data+"+"+values.isFixo
         ).then(() =>alert("Deu certo")).catch(err => alert("Não foi possível registrar a reserva o usuário..."))
    }

    const validations = yup.object().shape({
        sala:yup.string().required("Digite uma sala válida"),
        data:yup.string().min(10).required(),
    })

    return(
        <Sidebar {...props} 
        componente={
            <div className="container-cadastro"> 
                <div className="bg-form row">
                    <div className="form-fields col-12 align-self-center">
                        <div className="login-title">Solicitar Reserva</div>
                        <Formik 
                            initialValues={{sala: "", data: "", isFixo: "false"}}
                            onSubmit={handleSubmit}
                            validationSchema={validations}
                        >

                            <Form className="app-form">
                                <div className="row justify-content-center">

                                    <div className="form-group text-left col-6">
                                    <label className="exemple-data">Data:</label>
                                        <Field name="data" className="form-control" placeholder="Data"/>
                                        <ErrorMessage className="form-error" name="data" component="span"/>
                                    </div>
                                
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
                                        <label className="exemple-Tipo">Tipo de Atendimento:</label>
                                        <Field className="form-control" component="select" name="isFixo">
                                            <option value="false">Pontual</option>
                                            <option value="true">Fixo</option>
                                        </Field>
                                        <ErrorMessage className="form-error" name="isFixo" component="span"/>  
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

export default CadastroReserva;