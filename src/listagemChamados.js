import React from 'react';
import Sidebar from './sideBar'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { getToken } from './security/auth';

class ListagemChamados extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			listaChamados: []
		}
	}
    
	componentDidMount() {
		this.getChamados();
	}

    getChamados = () => {
		const token = getToken()
    	axios.get("http://localhost:8080/sigaachave/chamados", {headers:{token: token }}).then(response =>{
			console.log(response.data)
			this.setState({listaChamados: response.data})
    	}).catch(saida => console.log(saida))
    }

	deletarChamado = (id) => {
		const token = getToken()
		const instance = {
            method: 'delete',
            url: "http://localhost:8080/sigaachave/chamado/excluir?id="+id,
            headers: {token: token}
          };
    	axios(instance).then(response =>{
			this.getChamados()
			alert("Deletada!")
    	}).catch(saida => console.log(saida))
    }

    aceitarChamado = (id, sala) => {
		const token = getToken()
		const instance = {
            method: 'put',
            url: `http://localhost:8080/sigaachave/chamado/atualizar?id=${id}&status=CONFIRMADO&idSala=${sala}`,
            headers: {token: token}
          };
    	axios(instance).then(response =>{
			this.getChamados()
			alert("Chamado confirmado!")
    	}).catch(saida => console.log(saida))
	}
	
	executarChamado = (id, sala) => {
		const token = getToken()
		const instance = {
            method: 'put',
            url: `http://localhost:8080/sigaachave/chamado/atualizar?id=${id}&status=EM_EXECUCAO&idSala=${sala}`,
            headers: {token: token}
          };
    	axios(instance).then(response =>{
			this.getChamados()
			alert("Chamado em andamento!")
    	}).catch(saida => console.log(saida))
    }

	render(){
		const {listaChamados} = this.state
	    return(
	        <Sidebar {...this.props} componente={
	            <div>	            	
	            	<h2 className="text-left inline">Chamados</h2>
	            	<button className="btn btn-primary novo-cadastro"><Link to="/cadastro-chamado">+ Novo Chamado</Link></button>
					<table>
						<thead>
							<tr>
								<th>Sala</th>
								<th>Descrição</th>
								<th>Status</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
						{listaChamados.map( (item, key) => {
								return (
									<tr key={key}>
										<td>{item.sala}</td>
										<td>{item.descricao}</td>
										<td>{item.status}</td>
										<td>
											<i className="g-icon fas fa-check clicavel" 
													onClick={() => this.aceitarChamado(item.id, item.sala)}>
											</i>
											<i className="y-icon fas fa-clock clicavel" 
													onClick={() => this.executarChamado(item.id,item.sala)}>
											</i>
											<i className="r-icon fas fa-trash-alt clicavel" 
													onClick={() => this.deletarChamado(item.id)}>
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

export default ListagemChamados;