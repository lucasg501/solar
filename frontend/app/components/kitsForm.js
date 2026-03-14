'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function KitsForm(props) {

    const [kit, setKit] = useState(
        props.kit ? props.kit : {
            nomeKit: '',
            descKit: '',
            kitAtivo: 'N'
        }
    );

    const nomeKit = useRef();
    const descKit = useRef();
    const kitAtivo = useRef();

    // Atualiza o estado se receber props.kit
    useEffect(() => {
        if (props.kit) {
            setKit(props.kit);
        }
    }, [props.kit]);

    // Função para salvar Kit
    function salvarKit() {
        httpClient.post('/kits/criar', {
            nomeKit: nomeKit.current.value,
            descKit: descKit.current.value,
            kitAtivo: kitAtivo.current.checked ? 'S' : 'N'
        }).then(r => {
            if (r.status === 200) {
                alert('Kit cadastrado com sucesso!');
                window.location.href = '/kits';
            } else {
                alert('Erro ao cadastrar kit!');
            }
        });
    }

    // Função para alterar Kit
    function alterarKit() {
        httpClient.put('/kits/alterar', {
            idKit: kit.idKit,
            nomeKit: nomeKit.current.value,
            descKit: descKit.current.value,
            kitAtivo: kitAtivo.current.checked ? 'S' : 'N'
        }).then(r => {
            if (r.status === 200) {
                alert('Kit alterado com sucesso!');
                window.location.href = '/kits';
            } else {
                alert('Erro ao alterar kit!');
            }
        });
    }

    return (
        <div>

            <div>
                <Link href="/kits">
                    <button style={{ margin: 10 }} className="btn btn-secondary">Voltar</button>
                </Link>
            </div>

            <div className="container-fluid">
                <div className="row">

                    {/* Nome do Kit */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nome do Kit:</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={nomeKit}
                            defaultValue={kit.nomeKit}
                        />
                    </div>

                    {/* Descrição do Kit */}
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Descrição:</label>
                        <textarea
                            className="form-control"
                            ref={descKit}
                            defaultValue={kit.descKit}
                        />
                    </div>

                    {/* Kit Ativo */}
                    <div className="col-md-3 mb-3 d-flex align-items-center">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                ref={kitAtivo}
                                defaultChecked={kit.kitAtivo === 'S'}
                            />
                            <label className="form-check-label ms-2">
                                Kit Ativo
                            </label>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="col-12 mt-3">
                        <Link href="/kits">
                            <button className="btn btn-danger">Cancelar</button>
                        </Link>

                        <button style={{ margin: 10 }} className="btn btn-primary">
                            {kit.idKit != null ? (
                                <span onClick={alterarKit}>Alterar</span>
                            ) : (
                                <span onClick={salvarKit}>Salvar</span>
                            )}
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}