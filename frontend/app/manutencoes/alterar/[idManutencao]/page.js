'use client';

import ManutencaoForm from "@/app/components/manutencaoForm";
import httpClient from "@/app/utils/httpClient";
import { use, useEffect, useState } from "react";

export default function AlterarManutencao({ params }) {

    const { idManutencao } = use(params);

    const [manutencao, setManutencao] = useState(null);

    function obterManutencao() {

        let status = 0;

        httpClient.get(`/manutencao/obter/${idManutencao}`)
        .then(r => {
            status = r.status;
            return r.json();
        })
        .then(r => {
            if (status === 200) {
                setManutencao(r);
            } else {
                alert('Erro ao obter manutenção');
            }
        });

    }

    useEffect(() => {
        obterManutencao();
    }, [idManutencao]);

    return (
        <div>
            {manutencao != null 
                ? <ManutencaoForm manutencao={manutencao} /> 
                : <p>Carregando...</p>
            }
        </div>
    )
}