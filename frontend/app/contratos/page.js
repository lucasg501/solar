'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import httpClient from "@/app/utils/httpClient";

export default function Contratos(){

    const[listaContratos, setListaContratos] = useState([]);
    const[listaClientes, setListaClientes] = useState([]);

    function listarContratos(){
        let status = 0;
        httpClient.get('/contratos/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    setListaContratos(r);
                } else {
                    alert('Erro ao listar contratos');
                }
            })
    }

    function listarClientes(){
        let status = 0;
        httpClient.get('/clientes/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    setListaClientes(r);
                } else {
                    alert('Erro ao listar clientes');
                }
            })
    }

    function excluirContrato(idContrato){
        let status = 0;
        if(confirm('Deseja realmente excluir este contrato?')){
            httpClient.delete(`/contratos/excluir/${idContrato}`)
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status === 200) {
                        alert('Contrato excluido com sucesso');
                        listarContratos();
                    } else {
                        alert('Erro ao excluir contrato');
                    }
                })
        }
    }

    function buscaCliente(idCliente){
        const cliente = listaClientes.find(c => c.idCliente === idCliente);
        return cliente ? cliente.nomeCliente : '';
    }

    function formatarData(dataContrato){
        const dataObj = new Date(dataContrato);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    useEffect(() => {
        listarContratos();
        listarClientes();
    }, []);

    return(
        <div>
            <h1>Contratos</h1>

            <div>
                <Link href={'/contratos/criar'}>
                    <button style={{margin: 10}} className="btn btn-primary">Cadastrar</button>
                </Link>
            </div>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID Contrato</th>
                            <th>Cliente</th>
                            <th>Número do Contrato</th>
                            <th>Data Do Contrato</th>
                            <th>Status</th>
                            <th>Observação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaContratos.map(function(value,index){
                                return(
                                    <tr key={index}>
                                        <td>{value.idContrato}</td>
                                        <td>{buscaCliente(value.idCliente) || value.idCliente}</td>
                                        <td>{value.numeroContrato}</td>
                                        <td>{formatarData(value.dataContrato)}</td>
                                        <td>{value.statusContrato}</td>
                                        <td>{value.obsContrato}</td>
                                        <td>
                                            <button className="btn btn-primary"><i className="fas fa-pen"></i></button>
                                            <button style={{marginLeft: 10}} className="btn btn-danger" onClick={() => excluirContrato(value.idContrato)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>

            </div>
        </div>
    )
}