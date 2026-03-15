'use client'
import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function Clientes() {

    const [listaClientes, setListaClientes] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [limite] = useState(10);

    const [nomeFiltro, setNomeFiltro] = useState('');
    const [cidadeFiltro, setCidadeFiltro] = useState('');
    const [telefoneFiltro, setTelefoneFiltro] = useState('');
    const [aceitaLigacaoFiltro, setAceitaLigacaoFiltro] = useState('');

    function listarClientes() {
        let status = 0;
        let url = `/clientes/listar?pagina=${pagina}&limite=${limite}&nome=${nomeFiltro}&cidade=${cidadeFiltro}&telefone=${telefoneFiltro}`;

        httpClient.get(url)
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    // rota retorna { dados: [...], total: X }
                    setListaClientes(r.dados || []);
                } else {
                    alert('Erro ao listar clientes');
                }
            })
            .catch(err => {
                console.error("Erro na requisição:", err);
                setListaClientes([]);
            });
    }

    function excluirCliente(idCliente) {
        let status = 0;
        if (confirm('Deseja realmente excluir este cliente?')) {
            httpClient.delete(`/clientes/excluir/${idCliente}`)
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(() => {
                    if (status === 200) {
                        alert('Cliente excluído com sucesso');
                        listarClientes();
                    } else {
                        alert('Erro ao excluir cliente');
                    }
                })
                .catch(err => console.error("Erro ao excluir:", err));
        } else {
            alert('Operação cancelada');
        }
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
        listarClientes();
    }

    function resetarFiltros() {
        setNomeFiltro('');
        setCidadeFiltro('');
        setTelefoneFiltro('');
        setAceitaLigacaoFiltro('');
        setPagina(1);
        setTimeout(() => listarClientes(), 100);
    }

    useEffect(() => {
        listarClientes();
    }, [pagina]);

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

            {/* FILTROS */}
            <div className="d-flex flex-nowrap align-items-center" style={{ marginBottom: 20, gap: 10 }}>
                <input className="form-control" placeholder="Buscar por nome"
                    value={nomeFiltro} onChange={(e) => setNomeFiltro(e.target.value)} style={{ width: 220 }} />
                <input className="form-control" placeholder="Buscar por cidade"
                    value={cidadeFiltro} onChange={(e) => setCidadeFiltro(e.target.value)} style={{ width: 200 }} />
                <input className="form-control" placeholder="Buscar por telefone"
                    value={telefoneFiltro} onChange={(e) => setTelefoneFiltro(e.target.value)} style={{ width: 200 }} />
                <select className="form-control" value={aceitaLigacaoFiltro}
                    onChange={(e) => setAceitaLigacaoFiltro(e.target.value)} style={{ width: 140 }}>
                    <option value="">Ligação</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                </select>
                <button className="btn btn-secondary" onClick={aplicarFiltros} style={{ width: 90 }}>Buscar</button>
                <button className="btn btn-warning" onClick={resetarFiltros} style={{ width: 80 }}>Reset</button>
            </div>

            {/* TABELA */}
            <div style={{ overflowX: "auto" }} className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th><th>Nome</th><th>Telefone</th><th>Aceita Ligação</th>
                            <th>Endereço</th><th>Nº</th><th>Bairro</th><th>Cidade</th>
                            <th>Estado</th><th>CEP</th><th>Editar</th><th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaClientes
                            .filter(cliente => {
                                if (aceitaLigacaoFiltro === '') return true;
                                return cliente.pode_ligar == aceitaLigacaoFiltro;
                            })
                            .map((value, index) => (
                                <tr key={value.idCliente}>
                                    <td>{(pagina - 1) * limite + index + 1}</td>
                                    <td>{value.nomeCliente}</td>
                                    <td>
                                        {value.telefoneCliente}
                                        {value.telefoneCliente && (
                                            <i style={{ color: "green", marginLeft: 5, cursor: "pointer" }}
                                                className="fa-brands fa-whatsapp"
                                                onClick={() => window.open(`http://wa.me/${value.telefoneCliente}`, '_blank')}>
                                            </i>
                                        )}
                                    </td>
                                    <td>{value.pode_ligar == 1 ? 'Sim' : 'Não'}</td>
                                    <td>{value.enderecoCliente}</td>
                                    <td>{value.numCasa}</td>
                                    <td>{value.bairroCliente}</td>
                                    <td>{value.cidadeCliente}</td>
                                    <td>{value.estadoCliente}</td>
                                    <td>{value.cepCliente}</td>
                                    <td>
                                        <Link href={`/clientes/alterar/${value.idCliente}`}>
                                            <button className="btn btn-primary"><i className="fas fa-pen"></i></button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => excluirCliente(value.idCliente)}
                                            style={{ marginLeft: 10 }} className="btn btn-danger">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINAÇÃO */}
            <div style={{ marginTop: 20 }}>
                <button className="btn btn-secondary" onClick={paginaAnterior} style={{ marginRight: 10 }}>Anterior</button>
                <span>Página {pagina}</span>
                <button className="btn btn-secondary" onClick={proximaPagina} style={{ marginLeft: 10 }}>Próxima</button>
            </div>
        </div>
    )
}
