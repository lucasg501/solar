'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";

export default function VendasPage() {

    const [listaVendas, setListaVendas] = useState([]);
    const [listaClientes, setListaClientes] = useState([]);

    function listarVendas() {
        let status = 0;
        httpClient.get('/vendas/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    setListaVendas(r);
                } else {
                    console.log('Erro ao listar vendas');
                }
            })
    }

    function listarClientes() {
        let status = 0;
        httpClient.get('/clientes/listarTodos')
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

    useEffect(() => {
        listarVendas();
        listarClientes();
    }, []);

    function acharCliente(idCliente) {
        const cliente = listaClientes.find(c => c.idCliente === idCliente);
        return cliente ? cliente.nomeCliente : 'Cliente não encontrado';
    }

    function formatarData(dataVenda) {
        const data = new Date(dataVenda);
        return data.toLocaleDateString('pt-BR');
    }

    function excluirVenda(idVenda) {
        let status = 0;
        if (confirm('Deseja realmente excluir esta venda?')) {
            httpClient.delete(`/vendas/excluir/${idVenda}`)
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status === 200) {
                        alert('Venda excluida com sucesso');
                        listarVendas();
                    } else {
                        alert('Erro ao excluir venda');
                    }
                })
        } else {
            alert('Operação cancelada');
        }
    }

    return (
        <div>
            <h1>Vendas</h1>

            <div>
                <Link href="/vendas/criar">
                    <button style={{ margin: 10 }} className="btn btn-primary">Cadastrar</button>
                </Link>
            </div>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Cliente</th>
                            <th>Tipo de venda</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaVendas.map(function (value, index) {
                                return (
                                    <tr key={index}>
                                        <td>{value.idVenda}</td>
                                        <td>{acharCliente(value.idCliente)}</td>
                                        <td>{value.tipoVenda}</td>
                                        <td>{value.descricaoVenda}</td>
                                        <td>{value.valorVenda}</td>
                                        <td>{formatarData(value.dataVenda)}</td>
                                        <td>{value.statusVenda}</td>
                                        <td>
                                            <Link href={`/vendas/alterar/${value.idVenda}`}>
                                                <button className="btn btn-primary"><i className="fas fa-pen"></i></button>
                                            </Link>

                                            <button onClick={() => { excluirVenda(value.idVenda) }} style={{ marginLeft: 10 }} className="btn btn-danger"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}