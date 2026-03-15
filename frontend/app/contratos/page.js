'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import httpClient from "@/app/utils/httpClient";

export default function Contratos(){

    const [listaContratos, setListaContratos] = useState([]);
    const [listaClientes, setListaClientes] = useState([]);

    const [pagina, setPagina] = useState(1);
    const [limite] = useState(10);
    const [nomeFiltro, setNomeFiltro] = useState('');

    function listarContratos(){

        let status = 0;

        let url = `/contratos/listarPag?pagina=${pagina}&limite=${limite}&nome=${nomeFiltro}`;

        httpClient.get(url)
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

    function listarClientes(){
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

    function excluirContrato(idContrato){

        let status = 0;

        if(confirm('Deseja realmente excluir este contrato?')){

            httpClient.delete(`/contratos/excluir/${idContrato}`)
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(() => {
                    if (status === 200) {
                        alert('Contrato excluido com sucesso');
                        listarContratos();
                    } else {
                        alert('Erro ao excluir contrato');
                    }
                })
        }
    }

    function buscaCliente(idCliente){
        const cliente = listaClientes.find(c => c.idCliente === idCliente);
        return cliente ? cliente.nomeCliente : '';
    }

    function formatarData(dataContrato){
        const dataObj = new Date(dataContrato);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function proximaPagina(){
        setPagina(pagina + 1);
    }

    function paginaAnterior(){
        if(pagina > 1){
            setPagina(pagina - 1);
        }
    }

    function aplicarFiltros(){
        setPagina(1);
        listarContratos();
    }

    function resetarFiltros(){

        setNomeFiltro('');
        setPagina(1);

        setTimeout(()=>{
            listarContratos();
        },100)
    }

    useEffect(() => {
        listarContratos();
    }, [pagina]);

    useEffect(() => {
        listarClientes();
    }, []);

    return(
        <div>

            <h1>Contratos</h1>

            <div>
                <Link href={'/contratos/criar'}>
                    <button style={{margin: 10}} className="btn btn-primary">Cadastrar</button>
                </Link>
            </div>

            {/* FILTROS */}

            <div className="d-flex flex-nowrap align-items-center" style={{gap:10, marginBottom:20}}>

                <input
                    className="form-control"
                    placeholder="Buscar por nome do cliente"
                    value={nomeFiltro}
                    onChange={(e)=>setNomeFiltro(e.target.value)}
                    style={{width:250}}
                />

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

            <div className="table-responsive">

                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th>ID Contrato</th>
                            <th>Cliente</th>
                            <th>Número do Contrato</th>
                            <th>Data Do Contrato</th>
                            <th>Status</th>
                            <th>Observação</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            listaContratos.map(function(value,index){
                                return(
                                    <tr key={value.idContrato}>

                                        <td>{value.idContrato}</td>

                                        <td>{buscaCliente(value.idCliente) || value.idCliente}</td>

                                        <td>{value.numeroContrato}</td>

                                        <td>{formatarData(value.dataContrato)}</td>

                                        <td>{value.statusContrato}</td>

                                        <td>{value.obsContrato}</td>

                                        <td>
                                            <Link href={`/contratos/alterar/${value.idContrato}`}>
                                                <button className="btn btn-primary">
                                                    <i className="fas fa-pen"></i>
                                                </button>
                                            </Link>
                                        </td>

                                        <td>
                                            <button
                                                style={{marginLeft: 10}}
                                                className="btn btn-danger"
                                                onClick={()=>excluirContrato(value.idContrato)}
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

            <div style={{marginTop:20}}>

                <button
                    className="btn btn-secondary"
                    onClick={paginaAnterior}
                    style={{marginRight:10}}
                >
                    Anterior
                </button>

                <span>Página {pagina}</span>

                <button
                    className="btn btn-secondary"
                    onClick={proximaPagina}
                    style={{marginLeft:10}}
                >
                    Próxima
                </button>

            </div>

        </div>
    )
}