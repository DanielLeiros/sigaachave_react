import React from 'react';
import Sidebar from './sideBar'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { getToken } from './security/auth';

class ListagemSalas extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			listaSalas: []
		}
	}
    
	componentDidMount() {
		this.getSalas();
	}

    getSalas = () => {
		const token = getToken()
    	axios.get("http://localhost:8080/sigaachave/salas").then(response =>{
			this.setState({listaSalas: response.data})
    	}).catch(saida => console.log(saida))
    }

	deletarSalas = (id) => {
		const token = getToken()
		const instance = {
            method: 'delete',
            url: "http://localhost:8080/sigaachave/sala/excluir?id="+id,
          };
    	axios(instance).then(response =>{
			this.getSalas()
			alert("Deletada!")
    	}).catch(saida => console.log(saida))
    }

	render(){
		const {listaSalas} = this.state
	    return(
	        <Sidebar {...this.props} componente={
	            <div>	            	
	            	<h2 className="text-left inline">Salas</h2>
	            	<button className="btn btn-primary novo-cadastro"><Link to="/cadastro-salas">+ Nova Sala</Link></button>
					<table>
						<thead>
							<tr>
								<th>Id</th>
								<th>Nome</th>
								<th>Localização</th>
								<th>Descrição</th>
								<th>Permite fixar</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
						{listaSalas.map( (item, key) => {
								return (
									<tr key={key}>
										<td>{item.id}</td>
										<td>{item.nome}</td>
										<td>{item.localizacao}</td>
										<td>{item.descricao}</td>
										<td>{item.permiteFixo ? "Permite" : "Não permite"}</td>
										<td>

										<i className="r-icon fas fa-trash-alt clicavel" 
												onClick={() => this.deletarSalas(item.id)}>
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

export default ListagemSalas;