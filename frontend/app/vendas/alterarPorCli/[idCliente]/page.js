'use client';

import VendaForm from "@/app/components/vendasForm";
import httpClient from "@/app/utils/httpClient";
import { use, useEffect, useState } from "react";

export default function AlterarVenda({ params }) {

    const { idCliente } = use(params);
    const [venda, setVenda] = useState(null);

    function obterVenda() {
        let status = 0;

        httpClient.get(`/vendas/obterPorIdCliente/${idCliente}`)
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    setVenda(r);
                } else {
                    alert('Erro ao obter venda');
                }
            })
            .catch(() => alert('Erro ao buscar venda'));
    }

    useEffect(() => {
        if (idCliente) {
            obterVenda();
        }
    }, [idCliente]);

    return (
        <div>
            {venda ? <VendaForm venda={venda} /> : <p>Carregando...</p>}
        </div>
    );
}