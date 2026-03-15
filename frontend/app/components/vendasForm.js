'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function VendaForm(props) {

    const [venda, setVenda] = useState(
        props.venda ? {
            ...props.venda,
            dataVenda: props.venda.dataVenda ? props.venda.dataVenda.split('T')[0] : ''
        } : {
            idCliente: 0,
            tipoVenda: '',
            descricaoVenda: '',
            valorVenda: '',
            dataVenda: '',
            statusVenda: 'orcamento'
        }
    );

    const tipoVenda = useRef();
    const descricaoVenda = useRef();
    const valorVenda = useRef();
    const statusVenda = useRef();

    const [loadingClientes, setLoadingClientes] = useState(false);
    const [listaClientes, setListaClientes] = useState([]);

    // Lista clientes
    function listarClientes() {
        setLoadingClientes(true);
        httpClient.get('/clientes/listarTodos')
            .then(r => r.json())
            .then(r => {
                setListaClientes(Array.isArray(r) ? r : []);
                setLoadingClientes(false);
            })
            .catch(() => setLoadingClientes(false));
    }

    useEffect(() => {
        listarClientes();
    }, []);

    // Atualiza venda caso venha por props
    useEffect(() => {
        if (props.venda) {
            setVenda({
                ...props.venda,
                dataVenda: props.venda.dataVenda ? props.venda.dataVenda.split('T')[0] : ''
            });
        }
    }, [props.venda]);

    // Função salvar
    function salvarVenda() {
        httpClient.post('/vendas/criar', {
            idCliente: venda.idCliente,
            tipoVenda: tipoVenda.current.value,
            descricaoVenda: descricaoVenda.current.value,
            valorVenda: valorVenda.current.value,
            dataVenda: venda.dataVenda,
            statusVenda: statusVenda.current.value
        }).then(r => {
            if (r.status === 200) {
                alert('Venda cadastrada com sucesso!');
                window.location.href = '/vendas';
            } else {
                alert('Erro ao cadastrar venda!');
            }
        });
    }

    // Função alterar
    function alterarVenda() {
        httpClient.put('/vendas/alterar', {
            idVenda: venda.idVenda,
            idCliente: venda.idCliente,
            tipoVenda: tipoVenda.current.value,
            descricaoVenda: descricaoVenda.current.value,
            valorVenda: valorVenda.current.value,
            dataVenda: venda.dataVenda,
            statusVenda: statusVenda.current.value
        }).then(r => {
            if (r.status === 200) {
                alert('Venda alterada com sucesso!');
                window.location.href = '/vendas';
            } else {
                alert('Erro ao alterar venda!');
            }
        });
    }

    return (
        <div>

            <div>
                <Link href="/vendas">
                    <button style={{ margin: 10 }} className="btn btn-secondary">Voltar</button>
                </Link>
            </div>

            <div className="container-fluid">
                <div className="row">

                    {/* Cliente */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Cliente:</label>
                        <select
                            className="form-control"
                            value={venda.idCliente}
                            onChange={e => setVenda({ ...venda, idCliente: e.target.value })}
                        >
                            <option value={0}>Selecione um cliente</option>
                            {listaClientes.map((c, idx) => (
                                <option key={idx} value={c.idCliente}>
                                    {c.nomeCliente}
                                </option>
                            ))}
                        </select>
                        {loadingClientes && <small>Carregando clientes...</small>}
                    </div>

                    {/* Tipo de Venda */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Tipo de Venda:</label>
                        <select
                            className="form-control"
                            ref={tipoVenda}
                            defaultValue={venda.tipoVenda}
                        >
                            <option value="">Selecione um tipo</option>
                            <option value="limpeza">Limpeza</option>
                            <option value="manutencao">Manutenção</option>
                            <option value="projeto">Projeto</option>
                            <option value="equipamento">Equipamento</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>

                    {/* Descrição */}
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Descrição:</label>
                        <textarea
                            className="form-control"
                            ref={descricaoVenda}
                            defaultValue={venda.descricaoVenda}
                        />
                    </div>

                    {/* Valor */}
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Valor:</label>
                        <input
                            type="number"
                            className="form-control"
                            ref={valorVenda}
                            defaultValue={venda.valorVenda}
                            step="0.01"
                        />
                    </div>

                    {/* Data da Venda */}
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Data da Venda:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={venda.dataVenda}
                            onChange={e => setVenda({ ...venda, dataVenda: e.target.value })}
                        />
                    </div>

                    {/* Status da Venda */}
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Status:</label>
                        <select
                            className="form-control"
                            ref={statusVenda}
                            defaultValue={venda.statusVenda}
                        >
                            <option value="orcamento">Orçamento</option>
                            <option value="aprovado">Aprovado</option>
                            <option value="executando">Executando</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>

                    {/* Botões */}
                    <div className="col-12">
                        <Link href="/vendas">
                            <button className="btn btn-danger">Cancelar</button>
                        </Link>

                        <button style={{ margin: 10 }} className="btn btn-primary">
                            {venda.idVenda != null ? (
                                <span onClick={alterarVenda}>Alterar</span>
                            ) : (
                                <span onClick={salvarVenda}>Salvar</span>
                            )}
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}