'use client'

import { useTokenUsuario } from "@/app/(compartilhado)/_context/provedor-contexto-usuario";

export default function ContaPage() {
    const dadosUsuarioContexto = useTokenUsuario();

    if (!dadosUsuarioContexto) {
        return null;
    }
    console.log(dadosUsuarioContexto);

    return (
        <main>
            <h1 onClick={() => console.log('teste')}>Conta: {dadosUsuarioContexto?.usuario?.nome}</h1>
        </main>
    )
}

