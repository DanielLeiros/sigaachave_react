import React from 'react';
import Sidebar from './sideBar'
import axios from 'axios';
import {Link} from 'react-router-dom';

class ListagemReservas extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			listaReservas: []
		}
	}
    
	componentDidMount() {
		this.getReservas();
	}

    getReservas = () => {
    	axios.get("http://localhost:8080/sigaachave/reservas").then(response =>{
			this.setState({listaReservas: response.data})
    	}).catch(saida => console.log(saida))
    }

	deletarReserva = (id) => {
    	axios.delete("http://localhost:8080/sigaachave/reservas/"+id+"/excluir").then(response =>{
			this.getReservas()
			alert("Deletada!")
    	}).catch(saida => console.log(saida))
    }

	render(){
		const {listaReservas} = this.state
	    return(
	        <Sidebar {...this.props} componente={
	            <div>	            	
	            	<h2 className="text-left inline">Reservas</h2>
	            	<button className="btn btn-primary novo-cadastro"><Link to="/cadastro-reserva">+ Nova Reserva</Link></button>
					<table>
						<thead>
							<tr>
								<th>Id</th>
								<th>Sala</th>
								<th>Data</th>
								<th>Tipo</th>
								<th>Status</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
						{listaReservas.map( (item, key) => {
								return (
									<tr key={key}>
										<td>{item.id}</td>
										<td>{item.sala}</td>
										<td>{item.data}</td>
										<td>{item.isFixo ? "Fixo" : "Não-Fixo"}</td>
										<td>{item.status}</td>
										<td>

										<Link to={"/editar-reserva/"+item.id}>
											<i className="b-icon fas fa-pencil-alt clicavel" ></i>
										</Link>

										<i className="r-icon fas fa-trash-alt clicavel" 
												onClick={() => this.deletarReserva(item.id)}>
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

export default ListagemReservas;