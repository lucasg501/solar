'use client';
import KitsForm from "@/app/components/kitsForm";
import httpClient from "@/app/utils/httpClient";
import { use, useEffect, useState } from "react";

export default function alterarKit({ params }) {

    const { idKit } = use(params);

    const [kit, setKit] = useState(null);
    const [loading, setLoading] = useState(true);

    function obterKit() {
        let status = 0;

        httpClient.get(`/kits/obter/${idKit}`)
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    setKit(r);
                } else {
                    alert('Erro ao obter kit');
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }

    useEffect(() => {
        obterKit();
    }, [idKit]);

    return (
        <div>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                kit != null ? <KitsForm kit={kit} /> : <p>Kit não encontrado</p>
            )}
        </div>
    );
}