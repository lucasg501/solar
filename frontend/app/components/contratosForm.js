'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function ContratosCadastrar(props) {

    const [contrato, setContrato] = useState(
        props.contrato ? props.contrato : {
            idCliente: 0,
            numeroContrato: '',
            dataContrato: '',
            statusContrato: '',
            obsContrato: ''
        }
    );

    const idCliente = useRef();
    const numeroContrato = useRef();
    const dataContrato = useRef();
    const statusContrato = useRef();
    const obsContrato = useRef();

    const [listaClientes, setListaClientes] = useState([]);

    useEffect(() => {
        if (props.contrato) {
            setContrato(props.contrato);
        }
    }, [props.contrato]);

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

    useEffect(() => {
        listarClientes();
    }, []);

    function gravarContrato() {

        let status = 0;

        httpClient.post('/contratos/criar', {
            idCliente: idCliente.current.value,
            numeroContrato: numeroContrato.current.value,
            dataContrato: dataContrato.current.value,
            statusContrato: statusContrato.current.value,
            obsContrato: obsContrato.current.value
        })
            .then(r => {
                status = r.status;

                if (status === 200) {
                    alert('Contrato salvo com sucesso!');
                    window.location.assign('/contratos');
                }
                else {
                    alert('Erro ao salvar contrato!');
                }
            })
    }

    function alterarContrato() {

        let status = 0;

        httpClient.put('/contratos/alterar', {
            idContrato: contrato.idContrato,
            idCliente: idCliente.current.value,
            numeroContrato: numeroContrato.current.value,
            dataContrato: dataContrato.current.value,
            statusContrato: statusContrato.current.value,
            obsContrato: obsContrato.current.value
        })
            .then(r => {

                status = r.status;

                if (status === 200) {
                    alert('Contrato alterado com sucesso!');
                    window.location.assign('/contratos');
                }
                else {
                    alert('Erro ao alterar contrato!');
                }

            })
    }

    return (
        <div>

            <div style={{ margin: 10 }}>
                <Link href={'/contratos'}>
                    <button className="btn btn-secondary">
                        Voltar
                    </button>
                </Link>
            </div>

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label>Cliente:</label>

                        <select
                            ref={idCliente}
                            className="form-control"
                            value={contrato.idCliente}
                            onChange={(e) =>
                                setContrato({
                                    ...contrato,
                                    idCliente: e.target.value
                                })
                            }
                        >

                            <option value={0}>Selecione um cliente</option>

                            {
                                listaClientes.map(function (value, index) {

                                    return (
                                        <option
                                            key={index}
                                            value={value.idCliente}
                                        >
                                            {value.nomeCliente}
                                        </option>
                                    )

                                })
                            }

                        </select>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label>Número Contrato:</label>

                        <input
                            type="text"
                            className="form-control"
                            defaultValue={contrato.numeroContrato}
                            ref={numeroContrato}
                        />

                    </div>

                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label>Data Contrato:</label>

                        <input
                            type="date"
                            className="form-control"
                            defaultValue={contrato.dataContrato ? contrato.dataContrato.substring(0,10) : ''}
                            ref={dataContrato}
                        />

                    </div>

                    <div className="col-md-4 mb-3">
                        <label>Status Contrato:</label>

                        <select
                            ref={statusContrato}
                            className="form-control"
                            value={contrato.statusContrato}
                            onChange={(e) =>
                                setContrato({
                                    ...contrato,
                                    statusContrato: e.target.value
                                })
                            }
                        >

                            <option value="">Selecione um status</option>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                            <option value="Cancelado">Cancelado</option>
                            <option value="Pendente">Pendente</option>

                        </select>

                    </div>

                </div>

                <div className="row">

                    <div className="col-md-10 mb-3">

                        <label>Observação:</label>

                        <textarea
                            className="form-control"
                            defaultValue={contrato.obsContrato}
                            ref={obsContrato}
                        />

                    </div>

                </div>

                <div className="form-group">

                    <Link style={{ margin: 10 }} href={'/contratos'}>
                        <button className="btn btn-danger">
                            Cancelar
                        </button>
                    </Link>

                    <button
                        onClick={() => {
                            props.contrato ? alterarContrato() : gravarContrato()
                        }}
                        className="btn btn-primary"
                    >
                        {props.contrato ? 'Alterar' : 'Cadastrar'}
                    </button>

                </div>

            </div>

        </div>
    )
}