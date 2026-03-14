'use client';
import ClientesForm from "@/app/components/clientesForm";
import httpClient from "@/app/utils/httpClient";
import { use, useEffect, useState } from "react";

export default function alterarCliente({params}){

    const {idCliente} = use(params);

    const [cliente, setCliente] = useState({});

    function obterCliente(){
        let status = 0;
        httpClient.get(`/clientes/obter/${idCliente}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status === 200){
                setCliente(r);
            }else{
                alert('Erro ao obter cliente');
            }
        })
    }

    useEffect(()=>{
        obterCliente();
    }, [idCliente]);

    return(
        <div>
            {cliente != null ? <ClientesForm cliente={cliente} /> : <p>Carregando...</p>}
        </div>
    )
}