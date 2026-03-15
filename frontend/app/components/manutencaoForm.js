'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function ManutencaoForm(props) {

    const [manutencao, setManutencao] = useState(
        props.manutencao ? props.manutencao : {
            idContrato: 0,
            anoManutencao: '',
            ligacaoRealizada: 0,
            servicoRealizado: 0,
            observacoes: '',
            finalizado: 0,
            dataServico: ''
        }
    )

    const idContrato = useRef()
    const anoManutencao = useRef()
    const ligacaoRealizada = useRef()
    const servicoRealizado = useRef()
    const observacoes = useRef()
    const finalizado = useRef()
    const dataServico = useRef()

    const [listaContratos, setListaContratos] = useState([]);

    function listarContratos() {
        let status = 0;

        httpClient.get('/contratos/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {

                    if (Array.isArray(r)) {
                        setListaContratos(r);
                    } else {
                        setListaContratos([]);
                    }

                } else {
                    alert('Erro ao listar contratos');
                }
            })
    }

    useEffect(() => {
        listarContratos();
    }, []);

    useEffect(() => {

        if (props.manutencao) {

            setManutencao({
                ...props.manutencao,
                dataServico: props.manutencao.dataServico
                    ? props.manutencao.dataServico.split("T")[0]
                    : ""
            })

        }

    }, [props.manutencao])


    useEffect(() => {

        if (manutencao && listaContratos.length > 0) {

            if (idContrato.current) {
                idContrato.current.value = manutencao.idContrato;
            }

            if (anoManutencao.current) {
                anoManutencao.current.value = manutencao.anoManutencao || '';
            }

            if (dataServico.current) {
                dataServico.current.value = manutencao.dataServico || '';
            }

            if (ligacaoRealizada.current) {
                ligacaoRealizada.current.checked = manutencao.ligacaoRealizada == 1;
            }

            if (servicoRealizado.current) {
                servicoRealizado.current.checked = manutencao.servicoRealizado == 1;
            }

            if (finalizado.current) {
                finalizado.current.checked = manutencao.finalizado == 1;
            }

            if (observacoes.current) {
                observacoes.current.value = manutencao.observacoes || '';
            }

        }

    }, [manutencao, listaContratos]);



    function salvarManutencao() {
        let status = 0;

        httpClient.post('/manutencao/criar', {
            idContrato: idContrato.current.value,
            anoManutencao: anoManutencao.current.value,
            ligacaoRealizada: ligacaoRealizada.current.checked ? 1 : 0,
            servicoRealizado: servicoRealizado.current.checked ? 1 : 0,
            observacoes: observacoes.current.value,
            finalizado: finalizado.current.checked ? 1 : 0,
            dataServico: dataServico.current.value
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(() => {
                if (status === 200) {
                    alert("Manutenção cadastrada com sucesso");

                    if (confirm("Gostaria de marcar uma venda para esse cliente?")) {
                        let statusContrato = 0;

                        httpClient.get(`/contratos/obter/${idContrato.current.value}`)
                            .then(r => {
                                statusContrato = r.status;
                                return r.json();
                            })
                            .then(contrato => {
                                if (statusContrato === 200) {
                                    // contrato é o objeto JSON retornado
                                    const idCliente = contrato.idCliente;
                                    const tipoVenda = "orcamento";
                                    const valorVenda = 0;

                                    httpClient.post('/vendas/criar', {
                                        idCliente,
                                        tipoVenda,
                                        valorVenda
                                    })
                                        .then(r => {
                                            if (r.status === 200) {
                                                // depois de criar a venda, você pode redirecionar
                                                window.location.href = `/vendas/alterarPorCli/${idCliente}`;
                                            } else {
                                                alert("Erro ao cadastrar venda");
                                            }
                                        })
                                        .catch(err => {
                                            console.error("Erro ao cadastrar venda:", err);
                                            alert("Erro ao cadastrar venda");
                                        });

                                } else {
                                    alert("Erro ao obter contrato");
                                }
                            })
                            .catch(err => {
                                console.error("Erro ao obter contrato:", err);
                                alert("Erro ao obter contrato");
                            });

                    } else {
                        window.location.href = "/manutencoes";
                    }
                } else {
                    alert("Erro ao cadastrar manutenção");
                }
            })
            .catch(err => {
                console.error("Erro ao cadastrar manutenção:", err);
                alert("Erro ao cadastrar manutenção");
            });
    }



    function alterarManutencao() {
        let status = 0;

        httpClient.put('/manutencao/alterar', {
            idManutencao: manutencao.idManutencao,
            idContrato: idContrato.current.value,
            anoManutencao: anoManutencao.current.value,
            ligacaoRealizada: ligacaoRealizada.current.checked ? 1 : 0,
            servicoRealizado: servicoRealizado.current.checked ? 1 : 0,
            observacoes: observacoes.current.value,
            finalizado: finalizado.current.checked ? 1 : 0,
            dataServico: dataServico.current.value
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(() => {
                if (status === 200) {
                    alert("Manutenção alterada com sucesso");

                    if (confirm("Gostaria de marcar uma venda para esse cliente?")) {
                        let statusContrato = 0;

                        httpClient.get(`/contratos/obter/${idContrato.current.value}`)
                            .then(r => {
                                statusContrato = r.status;
                                return r.json();
                            })
                            .then(contrato => {
                                if (statusContrato === 200) {
                                    // contrato é o objeto JSON retornado
                                    const idCliente = contrato.idCliente;
                                    const tipoVenda = "limpeza";
                                    const valorVenda = 0;

                                    httpClient.post('/vendas/criar', {
                                        idCliente,
                                        tipoVenda,
                                        valorVenda
                                    })
                                        .then(r => {
                                            if (r.status === 200) {
                                                // depois de criar a venda, você pode redirecionar
                                                window.location.href = `/vendas/alterarPorCli/${idCliente}`;
                                            } else {
                                                alert("Erro ao cadastrar venda");
                                            }
                                        })
                                        .catch(err => {
                                            console.error("Erro ao cadastrar venda:", err);
                                            alert("Erro ao cadastrar venda");
                                        });

                                } else {
                                    alert("Erro ao obter contrato");
                                }
                            })
                            .catch(err => {
                                console.error("Erro ao obter contrato:", err);
                                alert("Erro ao obter contrato");
                            });

                    } else {
                        window.location.href = "/manutencoes";
                    }
                } else {
                    alert("Erro ao cadastrar manutenção");
                }
            })
            .catch(err => {
                console.error("Erro ao cadastrar manutenção:", err);
                alert("Erro ao cadastrar manutenção");
            });
    }

    return (

        <div>

            <div>
                <Link href="/manutencoes">
                    <button style={{ margin: 10 }} className="btn btn-secondary">
                        Voltar
                    </button>
                </Link>
            </div>


            <div className="container-fluid">

                <div className="row">


                    <div className="col-md-6 mb-3">
                        <label className="form-label">Contrato:</label>

                        <select
                            className="form-control"
                            ref={idContrato}
                        >

                            <option value={0}>Selecione um contrato</option>

                            {
                                listaContratos.map((value, index) => (
                                    <option
                                        key={index}
                                        value={value.idContrato}
                                    >
                                        {value.numeroContrato} - Cliente {value.idCliente}
                                    </option>
                                ))
                            }

                        </select>

                    </div>


                    <div className="col-md-3 mb-3">
                        <label className="form-label">Ano Manutenção:</label>
                        <input
                            type="number"
                            className="form-control"
                            ref={anoManutencao}
                        />
                    </div>


                    <div className="col-md-3 mb-3">
                        <label className="form-label">Data do Serviço:</label>
                        <input
                            type="date"
                            className="form-control"
                            ref={dataServico}
                        />
                    </div>


                    <div className="col-md-12 mb-4">

                        <div className="d-flex justify-content-center gap-5">

                            <div className="form-check form-switch text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    ref={ligacaoRealizada}
                                />
                                <label className="form-check-label">
                                    Ligação realizada
                                </label>
                            </div>


                            <div className="form-check form-switch text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    ref={servicoRealizado}
                                />
                                <label className="form-check-label">
                                    Serviço realizado
                                </label>
                            </div>


                            <div className="form-check form-switch text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    ref={finalizado}
                                />
                                <label className="form-check-label">
                                    Finalizado
                                </label>
                            </div>

                        </div>

                    </div>



                    <div className="col-md-12 mb-3">
                        <label className="form-label">Observações:</label>
                        <textarea
                            className="form-control"
                            ref={observacoes}
                        />
                    </div>



                    <div className="col-12">

                        <Link href="/manutencoes">
                            <button className="btn btn-danger">
                                Cancelar
                            </button>
                        </Link>


                        <button style={{ margin: 10 }} className="btn btn-primary">

                            {manutencao.idManutencao != null ? (

                                <span onClick={alterarManutencao}>
                                    Alterar
                                </span>

                            ) : (

                                <span onClick={salvarManutencao}>
                                    Salvar
                                </span>

                            )}

                        </button>

                    </div>


                </div>

            </div>

        </div>

    )

}