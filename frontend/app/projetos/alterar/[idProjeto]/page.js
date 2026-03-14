'use client'

import httpClient from "@/app/utils/httpClient";
import { use, useEffect, useState } from "react"
import ProjetosForm from "@/app/components/projetosForm";

export default function AlterarProjeto({params}){

    const[projeto, setProjeto] = useState({});

    const{idProjeto} = use(params);

    function buscarProjeto(){
        let status = 0;
        httpClient.get(`/projetoSolar/obter/${idProjeto}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status === 200){
                setProjeto(r);
            }else{
                alert('Erro ao obter projeto');
            }
        })
    }

    useEffect(()=>{
        buscarProjeto();
    },[]);

    return(
        <div>
            {projeto != null ? <ProjetosForm projeto={projeto} /> : <p>Carregando...</p>}  
        </div>
    )
}