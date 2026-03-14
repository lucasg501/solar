'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react"
import httpClient from "../utils/httpClient";

export default function ClientesForm(props) {

    const [cliente, setCliente] = useState(
        props.cliente ? props.cliente : {
            nomeCliente: '',
            telefoneCliente: '',
            pode_ligar: false,
            enderecoCliente: '',
            bairroCliente: '',
            cidadeCliente: '',
            estadoCliente: '',
            cepCliente: '',
            numCasa: ''
        }
    )

    const [loadingCep, setLoadingCep] = useState(false)

    const nomeCliente = useRef();
    const telefoneCliente = useRef();
    const pode_ligar = useRef();
    const enderecoCliente = useRef();
    const bairroCliente = useRef();
    const cidadeCliente = useRef();
    const estadoCliente = useRef();
    const cepCliente = useRef();
    const numCasa = useRef();

    useEffect(() => {
        if (props.cliente) {
            setCliente(props.cliente)
        }
    }, [props.cliente]);


    function mascaraTelefone(e) {

        let valor = e.target.value.replace(/\D/g, '');

        if (valor.length > 11) valor = valor.slice(0, 11);

        if (valor.length > 10) {
            valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (valor.length > 6) {
            valor = valor.replace(/^(\d{2})(\d{4})(\d+).*/, '($1) $2-$3');
        } else if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d+)/, '($1) $2');
        }

        e.target.value = valor;
    }


    function mascaraCep(e) {

        let valor = e.target.value.replace(/\D/g, '');

        if (valor.length > 8) valor = valor.slice(0, 8);

        if (valor.length > 5) {
            valor = valor.replace(/^(\d{5})(\d+)/, '$1-$2');
        }

        e.target.value = valor;
    }


    async function buscarCep() {

        let cep = cepCliente.current.value.replace(/\D/g, '');

        if (cep.length !== 8) return;

        setLoadingCep(true);

        try {

            let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            let dados = await resposta.json();

            if (!dados.erro) {

                enderecoCliente.current.value = dados.logradouro;
                bairroCliente.current.value = dados.bairro;
                cidadeCliente.current.value = dados.localidade;
                estadoCliente.current.value = dados.uf;

            }

        } catch (error) {

            console.log("Erro ao buscar CEP:", error);

        }

        setLoadingCep(false);
    }

    function salvarCliente() {
        let status = 0;
        httpClient.post('/clientes/criar', {
            nomeCliente: nomeCliente.current.value,
            telefoneCliente: telefoneCliente.current.value,
            pode_ligar: pode_ligar.current.checked ? 1 : 0,
            enderecoCliente: enderecoCliente.current.value,
            bairroCliente: bairroCliente.current.value,
            cidadeCliente: cidadeCliente.current.value,
            estadoCliente: estadoCliente.current.value,
            cepCliente: cepCliente.current.value,
            numCasa: numCasa.current.value
        })
        .then(r=>{
            status = r.status;
            if (status === 200) {
                alert('Cliente salvo com sucesso!');
                window.location.href = '/clientes';
            }else{
                alert('Erro ao salvar cliente!');
            }
        })
    }

    function alterarCliente(){
        let status = 0;
        httpClient.put(`/clientes/alterar`, {
            idCliente: cliente.idCliente,
            nomeCliente: nomeCliente.current.value,
            telefoneCliente: telefoneCliente.current.value,
            pode_ligar: pode_ligar.current.checked ? 1 : 0,
            enderecoCliente: enderecoCliente.current.value,
            bairroCliente: bairroCliente.current.value,
            cidadeCliente: cidadeCliente.current.value,
            estadoCliente: estadoCliente.current.value,
            cepCliente: cepCliente.current.value,
            numCasa: numCasa.current.value
        })
        .then(r=>{
            status = r.status;
            if (status === 200) {
                alert('Cliente alterado com sucesso!');
                window.location.href = '/clientes';
            }else{
                alert('Erro ao alterar cliente!');
            }
        })
    }

    return (
        <div>

            <div>
                <Link href="/clientes">
                    <button style={{ margin: 10 }} className="btn btn-secondary">Voltar</button>
                </Link>
            </div>

            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nome:</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={nomeCliente}
                            defaultValue={cliente.nomeCliente}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label">Telefone:</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={telefoneCliente}
                            defaultValue={cliente.telefoneCliente}
                            onChange={mascaraTelefone}
                        />
                    </div>

                    <div className="col-md-2 mb-3 d-flex align-items-end">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                ref={pode_ligar}
                                defaultChecked={cliente.pode_ligar == 1}
                            />
                            <label className="form-check-label ms-2">
                                Pode ligar?
                            </label>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label">CEP:</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={cepCliente}
                            defaultValue={cliente.cepCliente}
                            onChange={mascaraCep}
                            onBlur={buscarCep}
                        />
                        {loadingCep && <small>Buscando endereço...</small>}
                    </div>

                    <div className="col-md-8 mb-3">
                        <label className="form-label">Endereço:</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={enderecoCliente}
                            defaultValue={cliente.enderecoCliente}
                        />
                    </div>

                    <div className="col-md-2 mb-3">
                        <label className="form-label">Número:</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={numCasa}
                            defaultValue={cliente.numCasa}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label">Bairro:</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={bairroCliente}
                            defaultValue={cliente.bairroCliente}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label">Cidade:</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={cidadeCliente}
                            defaultValue={cliente.cidadeCliente}
                        />
                    </div>

                    <div className="col-md-2 mb-3">
                        <label className="form-label">Estado:</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={estadoCliente}
                            defaultValue={cliente.estadoCliente}
                        />
                    </div>

                    <div className="col-12">

                        <Link href="/clientes">
                            <button className="btn btn-danger">Cancelar</button>
                        </Link>

                        <button style={{ margin: 10 }} className="btn btn-primary">
                            {cliente.idCliente != null ? (
                                <span onClick={alterarCliente}>Alterar</span>
                            ) : (
                                <span onClick={salvarCliente}>Salvar</span>
                            )}
                        </button>

                    </div>

                </div>
            </div>

        </div>
    )
}