import React from 'react';
import Sidebar from './sideBar'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { getToken } from './security/auth';

class ListagemUsuarios extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			listaUsuarios: []
		}
	}
    
	componentDidMount() {
		this.getUsuarios();
	}

    getUsuarios = () => {
		const token = getToken();
    	axios.get("http://localhost:8080/sigaachave/usuarios", {headers: {token: token}}).then(response =>{
			this.setState({listaUsuarios: response.data})
    	}).catch(saida => console.log(saida))
    }

	deletarUsuario = (id) => {
		const token = getToken();
		const instance = {
            method: 'delete',
            url: "http://localhost:8080/sigaachave/usuarios/excluir?id="+id,
            headers: {token: token}
          };
    	axios(instance).then(response =>{
			this.getUsuarios()
			alert("Deletado!")
    	}).catch(saida => console.log(saida))
    }

	render(){
		const {listaUsuarios} = this.state
	    return(
	        <Sidebar {...this.props} componente={
	            <div>	            	
	            	<h2 className="text-left inline">Usuários</h2>
	            	<button className="btn btn-primary novo-cadastro"><Link to="/cadastro-usuario">+ Novo Usuário</Link></button>
					<table>
						<thead>
							<tr>
								<th>Id</th>
								<th>Nome</th>
								<th>Perfil</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
						{listaUsuarios.map( (item, key) => {
								return (
									<tr key={key}>
										<td>{item.id}</td>
										<td>{item.nome}</td>
										<td>{item.papel}</td>
										<td><i className="r-icon fas fa-trash-alt clicavel" 
												onClick={() => this.deletarUsuario(item.id)}>
											</i>
										</td>
									</tr>
									)
							})}
						</tbody>
					</table>
	            </div>
	        } />
	    );
	}
}

export default ListagemUsuarios;