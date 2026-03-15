'use client';
import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function KitsPage() {

    const [listaKits, setListaKits] = useState([]);

    function carregarKits() {
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
                    alert('Erro ao carregar os kits');
                }
            })
    }

    function excluirKit(idKit) {
        let status = 0;
        if (confirm('Deseja realmente excluir o kit?')) {
            httpClient.delete('/kits/excluir/' + idKit)
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status === 200) {
                        alert('Kit excluido com sucesso');
                        carregarKits();
                    } else {
                        alert(`Erro ao excluir o kit: ${r.message}`);
                    }
                })
        } else {
            alert('Exclusão cancelada');
        }
    }

    useEffect(() => {
        carregarKits();
    }, []);

    return (
        <div>
            <h1>Kits</h1>

            <div>
                <Link href="/kits/criar">
                    <button style={{margin: 10}} className="btn btn-primary">Cadastrar</button>
                </Link>
            </div>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ativo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaKits.map(function (value, index) {
                                return (
                                    <tr key={index}>
                                        <td>{value.idKit}</td>
                                        <td>{value.nomeKit}</td>
                                        <td>{value.descKit}</td>
                                        <td>{value.kitAtivo == "S" ? "Sim" : "Não"}</td>
                                        <td>
                                            <Link href={`/kits/alterar/${value.idKit}`}><button className="btn btn-primary"><i className="fas fa-pen"></i></button></Link>
                                            <button style={{ marginLeft: 10 }} className="btn btn-danger" onClick={() => { excluirKit(value.idKit) }}><i className="fas fa-trash"></i></button>
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