'use client';
import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function ManutencoesPage() {

    const [listaManutencoes, setListaManutencoes] = useState([]);
    const [listaContratos, setListaContratos] = useState([]);

    const [pagina, setPagina] = useState(1);
    const [limite] = useState(10);

    const [anoFiltro, setAnoFiltro] = useState('');
    const [ligacaoFiltro, setLigacaoFiltro] = useState('');
    const [servicoFiltro, setServicoFiltro] = useState('');
    const [finalizadoFiltro, setFinalizadoFiltro] = useState('');

    function listarManutencoes() {

        let status = 0;

        let url = `/manutencao/listarPag?pagina=${pagina}&limite=${limite}&ano=${anoFiltro}&ligacaoRealizada=${ligacaoFiltro}&servicoRealizado=${servicoFiltro}&finalizado=${finalizadoFiltro}`;

        httpClient.get(url)
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {

                if (status === 200) {
                    setListaManutencoes(r);
                }
                else {
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
                }
                else {
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
                .then(() => {

                    if (status === 200) {
                        alert('Manutenção excluida com sucesso');
                        listarManutencoes();
                    }
                    else {
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

        if (!dataServico) return '';

        const data = new Date(dataServico);
        return data.toLocaleDateString('pt-BR');

    }

    function proximaPagina() {

        setPagina(pagina + 1);

    }

    function paginaAnterior() {

        if (pagina > 1) {
            setPagina(pagina - 1);
        }

    }

    function aplicarFiltros() {

        setPagina(1);
        listarManutencoes();

    }

    function resetarFiltros() {

        setAnoFiltro('');
        setLigacaoFiltro('');
        setServicoFiltro('');
        setFinalizadoFiltro('');
        setPagina(1);

        setTimeout(() => {
            listarManutencoes();
        }, 100);

    }

    useEffect(() => {

        listarManutencoes();

    }, [pagina]);

    useEffect(() => {

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

            {/* FILTROS */}

            <div className="d-flex flex-wrap" style={{ gap: 10, marginBottom: 20 }}>

                <input
                    type="number"
                    className="form-control"
                    placeholder="Ano"
                    value={anoFiltro}
                    onChange={(e) => setAnoFiltro(e.target.value)}
                    style={{ width: 120 }}
                />

                <select
                    className="form-control"
                    value={ligacaoFiltro}
                    onChange={(e) => setLigacaoFiltro(e.target.value)}
                    style={{ width: 180 }}
                >
                    <option value="">Ligação Realizada</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                </select>

                <select
                    className="form-control"
                    value={servicoFiltro}
                    onChange={(e) => setServicoFiltro(e.target.value)}
                    style={{ width: 180 }}
                >
                    <option value="">Serviço Realizado</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                </select>

                <select
                    className="form-control"
                    value={finalizadoFiltro}
                    onChange={(e) => setFinalizadoFiltro(e.target.value)}
                    style={{ width: 150 }}
                >
                    <option value="">Finalizado</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                </select>

                <button
                    className="btn btn-secondary"
                    onClick={aplicarFiltros}
                >
                    Buscar
                </button>

                <button
                    className="btn btn-warning"
                    onClick={resetarFiltros}
                >
                    Reset
                </button>

            </div>

            {/* TABELA */}

            <div className="table-responsive">

                <table className="table table-striped">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Contrato</th>
                            <th>Ano</th>
                            <th>Ligação</th>
                            <th>Serviço</th>
                            <th>Observações</th>
                            <th>Finalizado</th>
                            <th>Data</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            listaManutencoes.map(function (value) {

                                return (

                                    <tr key={value.idManutencao}>

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

                                                <button className="btn btn-primary">
                                                    <i className="fas fa-pen"></i>
                                                </button>

                                            </Link>

                                        </td>

                                        <td>

                                            <button
                                                style={{ marginLeft: 10 }}
                                                className="btn btn-danger"
                                                onClick={() => excluirManutencao(value.idManutencao)}
                                            >
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

            {/* PAGINAÇÃO */}

            <div style={{ marginTop: 20 }}>

                <button
                    className="btn btn-secondary"
                    onClick={paginaAnterior}
                    style={{ marginRight: 10 }}
                >
                    Anterior
                </button>

                <span>Página {pagina}</span>

                <button
                    className="btn btn-secondary"
                    onClick={proximaPagina}
                    style={{ marginLeft: 10 }}
                >
                    Próxima
                </button>

            </div>

        </div>

    )
}