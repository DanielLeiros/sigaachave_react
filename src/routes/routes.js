import React from "react";
import PrivateRoute from "./privateRoute";
import {BrowserRouter, Route, Switch} from "react-router-dom";
// import NotFound from '../notFound';
import Login from "../login/login";
import CadastroUser from "../Forms/cadastroUsuario";
import CadastroReserva from "../Forms/cadastroReserva";
import ListagemReservas from "../home";
import ListagemUsuarios from "../usuarios";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={props => <Login {...props} />} />
				<PrivateRoute exact path="/" component={props =>  <ListagemReservas {...props}/>} /> 
				<PrivateRoute exact path="/listagem-usuarios" component={props => <ListagemUsuarios {...props}/>} />
				<PrivateRoute exact path="/cadastro-usuario" component={props => <CadastroUser {...props}/>} />
				<PrivateRoute exact path="/cadastro-reserva" component={props => <CadastroReserva {...props}/>} />
				<PrivateRoute exact path="/editar-reserva/:id" component={props => <CadastroReserva {...props}/>} />
			</Switch>
		</BrowserRouter>
	)
};

export default Routes;

