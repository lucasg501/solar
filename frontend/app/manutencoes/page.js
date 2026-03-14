'use client';
import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function ManutencoesPage() {

    const [listaManutencoes, setListaManutencoes] = useState([]);
    const [listaContratos, setListaContratos] = useState([]);

    function listarManutencoes() {
        let status = 0;
        httpClient.get('/manutencao/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    setListaManutencoes(r);
                } else {
                    alert('Erro ao listar manutenções');
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

    function excluirManutencao(idManutencao) {
        let status = 0;
        if (confirm('Deseja realmente excluir esta manutenção?')) {
            httpClient.delete(`/manutencao/excluir/${idManutencao}`)
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status === 200) {
                        alert('Manutenção excluida com sucesso');
                        listarManutencoes();
                    } else {
                        alert('Erro ao excluir manutenção');
                    }
                })
        }
    }

    function buscaContrato(idContrato) {
        const contrato = listaContratos.find(c => c.idContrato === idContrato);
        return contrato ? contrato.numeroContrato : '';
    }

    function formatarData(dataServico) {
        const data = new Date(dataServico);
        return data.toLocaleDateString('pt-BR');
    }

    useEffect(() => {
        listarManutencoes();
        listarContratos();
    }, []);

    return (
        <div>
            <h1>Manutenções</h1>

            <div>
                <Link href="/manutencoes/criar">
                    <button style={{ margin: 10 }} className="btn btn-primary">Cadastrar</button>
                </Link>
            </div>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Contrato</th>
                            <th>Ano da última manutenção</th>
                            <th>Ligação Realizada</th>
                            <th>Serviço Realizado</th>
                            <th>Observações</th>
                            <th>Finalizado</th>
                            <th>Data do Serviço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaManutencoes.map(function (value, index) {
                                return (
                                    <tr key={index}>
                                        <td>{value.idManutencao}</td>
                                        <td>{buscaContrato(value.idContrato)}</td>
                                        <td>{value.anoManutencao}</td>
                                        <td>{value.ligacaoRealizada ? 'Sim' : 'Não'}</td>
                                        <td>{value.servicoRealizado ? 'Sim' : 'Não'}</td>
                                        <td>{value.observacoes}</td>
                                        <td>{value.finalizado ? 'Sim' : 'Não'}</td>
                                        <td>{formatarData(value.dataServico)}</td>
                                        <td>
                                            <Link href={`/manutencoes/alterar/${value.idManutencao}`}>
                                                <button className="btn btn-primary"><i className="fas fa-pen"></i></button></Link>
                                            <button style={{ marginLeft: 10 }} className="btn btn-danger" onClick={() => excluirManutencao(value.idManutencao)}>
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