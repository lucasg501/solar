'use client';

import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function ProjetosPage() {

    const [listaProjetos, setListaProjetos] = useState([]);
    const [listaContratos, setListaContratos] = useState([]);
    const [listaKits, setListaKits] = useState([]);

    function listarProjetos() {
        let status = 0;
        httpClient.get('/projetoSolar/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    setListaProjetos(r);
                } else {
                    alert('Erro ao listar projetos');
                }
            })
    }

    function listarContratos() {
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

    function listarKits() {
        let status = 0;
        httpClient.get('/kits/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    setListaKits(r);
                } else {
                    alert('Erro ao listar kits');
                }
            })
    }

    useEffect(() => {
        listarProjetos();
        listarContratos();
        listarKits();
    }, []);

    function buscarNomeContrato(idContrato) {
        const contrato = listaContratos.find(c => c.idContrato === idContrato);
        return contrato ? contrato.numeroContrato : '';
    }

    function buscarNomeKit(idKit) {
        const kit = listaKits.find(k => k.idKit === idKit);
        return kit ? kit.nomeKit : '';
    }

    function formatarData(dataInstalacao) {
        const data = new Date(dataInstalacao);
        return data.toLocaleDateString('pt-BR');
    }

    function excluirProjeto(idProjeto) {
        let status = 0;
        if (confirm('Deseja realmente excluir este projeto?')) {
            httpClient.delete(`/projetoSolar/excluir/${idProjeto}`)
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status === 200) {
                        alert('Projeto excluido com sucesso');
                        listarProjetos();
                    } else {
                        alert('Erro ao excluir projeto');
                    }
                })
        }
    }

    return (
        <div>
            <h1>Projetos</h1>

            <div>
                <Link href="/projetos/criar">
                    <button style={{margin: 10}} className="btn btn-primary">
                        Cadastrar
                    </button>
                </Link>
            </div>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Contrato</th>
                            <th>KWP</th>
                            <th>Kit</th>
                            <th>Data de Instalação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaProjetos.map(function (value, index) {
                                return(
                                    <tr key={index}>
                                        <td>{value.idProjeto}</td>
                                        <td>{buscarNomeContrato(value.idContrato)}</td>
                                        <td>{value.kwp}</td>
                                        <td>{buscarNomeKit(value.idKit)}</td>
                                        <td>{formatarData(value.dataInstalacao)}</td>
                                        <td>
                                            <Link href={`/projetos/alterar/${value.idProjeto}`}>
                                                <button className="btn btn-primary">
                                                    <i className="fas fa-pen"></i>
                                                </button>
                                            </Link>

                                            <button onClick={() =>{excluirProjeto(value.idProjeto)}} className="btn btn-danger" style={{ marginLeft: 10 }}>
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