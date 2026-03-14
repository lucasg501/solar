'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";

export default function ProjetosForm(props) {

    const [listaKits, setListaKits] = useState([]);
    const [listaContratos, setListaContratos] = useState([]);

    const [projeto, setProjeto] = useState({
        idProjeto: 0,
        idContrato: 0,
        idKit: 0,
        kwp: 0,
        dataInstalacao: ""
    });

    useEffect(() => {

        if (props.projeto) {

            setProjeto({
                idProjeto: props.projeto.idProjeto ?? 0,
                idContrato: props.projeto.idContrato ?? 0,
                idKit: props.projeto.idKit ?? 0,
                kwp: props.projeto.kwp ?? 0,
                dataInstalacao: props.projeto.dataInstalacao
                    ? props.projeto.dataInstalacao.split("T")[0]
                    : ""
            });

        }

    }, [props.projeto]);

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
        listarContratos();
        listarKits();
    }, []);

    function gravarProjeto() {

        let status = 0;

        httpClient.post('/projetoSolar/criar', projeto)
            .then(r => {
                status = r.status;

                if (status === 200) {
                    alert("Projeto cadastrado com sucesso");
                    window.location.assign('/projetos');
                } else {
                    alert("Erro ao cadastrar projeto");
                }
            })
    }

    function alterarProjeto() {

        let status = 0;

        httpClient.put('/projetoSolar/alterar', projeto)
            .then(r => {
                status = r.status;

                if (status === 200) {
                    alert("Projeto alterado com sucesso");
                    window.location.assign('/projetos');
                } else {
                    alert("Erro ao alterar projeto");
                }
            })
    }

    return (
        <div className="container-fluid">

            <h1>{props.projeto ? "Alterar Projeto" : "Novo Projeto"}</h1>

            <div>
                <Link href="/projetos">
                    <button style={{ margin: 10 }} className="btn btn-secondary">
                        Voltar
                    </button>
                </Link>
            </div>

            <div className="row">

                <div className="col-md-6 mb-3">
                    <label>Contrato:</label>

                    <select
                        className="form-control"
                        value={projeto.idContrato}
                        onChange={(e) =>
                            setProjeto({
                                ...projeto,
                                idContrato: Number(e.target.value)
                            })
                        }
                    >

                        <option value={0}>Selecione um contrato</option>

                        {
                            listaContratos.map((value, index) => (
                                <option
                                    key={index}
                                    value={value.idContrato}
                                >
                                    {value.idContrato} - {value.numeroContrato}
                                </option>
                            ))
                        }

                    </select>
                </div>

                <div className="col-md-6 mb-3">
                    <label>Kit:</label>

                    <select
                        className="form-control"
                        value={projeto.idKit}
                        onChange={(e) =>
                            setProjeto({
                                ...projeto,
                                idKit: Number(e.target.value)
                            })
                        }
                    >

                        <option value={0}>Selecione um kit</option>

                        {
                            listaKits.map((value, index) => (
                                <option
                                    key={index}
                                    value={value.idKit}
                                >
                                    {value.nomeKit}
                                </option>
                            ))
                        }

                    </select>
                </div>

            </div>

            <div className="row">

                <div className="col-md-4 mb-3">
                    <label>KWP:</label>

                    <input
                        type="number"
                        className="form-control"
                        value={projeto.kwp}
                        onChange={(e) =>
                            setProjeto({
                                ...projeto,
                                kwp: e.target.value
                            })
                        }
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label>Data Instalação:</label>

                    <input
                        type="date"
                        className="form-control"
                        value={projeto.dataInstalacao || ""}
                        onChange={(e) =>
                            setProjeto({
                                ...projeto,
                                dataInstalacao: e.target.value
                            })
                        }
                    />
                </div>

            </div>

            <div>

                <Link href="/projetos">
                    <button className="btn btn-danger" style={{ margin: 10 }}>
                        Cancelar
                    </button>
                </Link>

                <button
                    onClick={() => props.projeto ? alterarProjeto() : gravarProjeto()}
                    className="btn btn-primary"
                >
                    {props.projeto ? "Alterar" : "Cadastrar"}
                </button>

            </div>

        </div>
    )
}