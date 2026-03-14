'use client'
import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";
import Link from "next/link";
export default function clientes() {

    const [listaClientes, setListaClientes] = useState([]);

    function listarClientes() {
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

    function excluirCliente(idCliente) {
        let status = 0;
        if (confirm('Deseja realmente excluir este cliente?')) {
            httpClient.delete(`/clientes/excluir/${idCliente}`)
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status === 200) {
                        alert('Cliente excluido com sucesso');
                        listarClientes();
                    } else {
                        alert('Erro ao excluir cliente');
                    }
                })
        } else {
            alert('Operação cancelada');
        }
    }


    useEffect(() => {
        listarClientes();
    }, []);

    return (
        <div>
            <h1>Clientes</h1>

            <div>
                <Link href="/clientes/criar">
                    <button style={{ margin: 10 }} className="btn btn-primary">
                        Cadastrar
                    </button>
                </Link>
            </div>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Aceita Ligação</th>
                            <th>Endereço</th>
                            <th>Nº</th>
                            <th>Bairro</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>CEP</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaClientes.map(function (value, index) {
                                return (
                                    <tr key={index}>
                                        <td>{value.idCliente}</td>
                                        <td>{value.nomeCliente}</td>
                                        <td>{value.telefoneCliente} <i style={{color: "green"}} className="fa-brands fa-whatsapp" onClick={() => { window.open(`http://wa.me/${value.telefoneCliente}`, '_blank')}}></i></td>
                                        <td>{value.pode_ligar == 1 ? 'Sim' : 'Não'}</td>
                                        <td>{value.enderecoCliente}</td>
                                        <td>{value.numCasa}</td>
                                        <td>{value.bairroCliente}</td>
                                        <td>{value.cidadeCliente}</td>
                                        <td>{value.estadoCliente}</td>
                                        <td>{value.cepCliente}</td>
                                        <td>
                                            <Link href={`/clientes/alterar/${value.idCliente}`}>
                                                <button className="btn btn-primary">
                                                    <i className="fas fa-pen"></i>
                                                </button>
                                            </Link>
                                            <button onClick={() => { excluirCliente(value.idCliente) }} style={{ marginLeft: 10 }} className="btn btn-danger">
                                                <i className="fas fa-trash"></i>
                                            </button>
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