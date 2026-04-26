'use server'

import { LoginState } from "@/app/(login)/_components/login-form";
import { PASSWORD_LOST } from "@/functions/api";
import ApiError from "@/functions/api-error";

export default async function perdeuSenha(prevState: LoginState, formData: FormData): Promise<LoginState> {

    const login = formData.get('login') as string | null;
    const urlPerdeu = formData.get('url') as string | null;

    try {
        if (!login) throw new Error('Preencha os dados.');

        const { url } = PASSWORD_LOST();
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, url: urlPerdeu })
        })

        if (!response.ok) throw new Error('Email ou usuário não cadastrado.')

        return { dadosRetorno: null, ok: true, error: '' }
    } catch (error: unknown) {
        return ApiError(error);
    }

}