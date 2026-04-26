'use client';

import { Usuario } from '@/app/(login)/_services/usuario-logado';
import React from 'react';


type IUsuarioContext = {
    usuario: Usuario | null;
    setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
}


const UsuarioContexto = React.createContext<IUsuarioContext | null>(null);
export const useUsuario = () => {
    const contexto = React.useContext(UsuarioContexto);
    if (contexto === null) {
        throw new Error('useContext deve estar dentro do Provider.');
    }
    return contexto;
}



export function ProvedorContextoUsuario({ children, usuario }: { children: React.ReactNode; usuario: Usuario | null }) {
    const [estadoUsuario, setUsuario] = React.useState<Usuario | null>(usuario);

    return (
        <UsuarioContexto.Provider value={{ usuario: estadoUsuario, setUsuario }}>
            {children}
        </UsuarioContexto.Provider>
    )
}