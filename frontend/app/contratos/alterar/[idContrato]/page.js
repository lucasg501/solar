'use client'

import httpClient from "@/app/utils/httpClient";
import { use, useEffect, useState } from "react";
import ContratosForm from "@/app/components/contratosForm";

export default function AlterarContrato({params}){

    const {idContrato} = use(params);

    const [contrato, setContrato] = useState({});

    function buscarContrato(){
        let status = 0;
        httpClient.get(`/contratos/obter/${idContrato}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status === 200){
                setContrato(r);
            }
        })
    }

    useEffect(() =>{
        buscarContrato();
    },[]);

    return(
        <div>
            {contrato != null ? <ContratosForm contrato={contrato} /> : <p>Carregando...</p>}
        </div>
    )
}