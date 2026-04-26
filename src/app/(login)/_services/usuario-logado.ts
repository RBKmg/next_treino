'use server'

import { cookies } from "next/headers";

import { USER_GET } from "@/app/(compartilhado)/_functions/api";
import ApiError from "@/app/(compartilhado)/_functions/api-error";
// import { cache } from "react";


export type Usuario = {
    id: number;
    email: string;
    username: string;
    nome: string;
}

// Está em cache a busca pelos dados do usuário
// async function usuarioLogado() {
export default async function usuarioLogado() {
    try {
        const token = (await cookies()).get('token')?.value;

        if (!token) throw new Error('Token não encontrado');

        const { url } = USER_GET();
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            next: {
                revalidate: 60
            }
        })

        if (!response.ok) throw new Error('Erro ao pegar o usuário.')

        const dadosUsuario = await response.json() as Usuario;

        return { dadosUsuario, ok: true, error: '' }
    } catch (error: unknown) {
        return ApiError(error);
    }

}

// const usuarioLogadoCache = cache(usuarioLogado);
// export default usuarioLogadoCache;
