'use server'

import { LoginState } from "@/app/(login)/_components/login-form";
import { USER_POST } from "@/app/(compartilhado)/_functions/api";
import ApiError from "@/app/(compartilhado)/_functions/api-error";
import login from "./login";

export default async function usuarioCadastro(prevState: LoginState, formData: FormData): Promise<LoginState> {

    const username = formData.get('username') as string | null;
    const email = formData.get('email') as string | null;
    const password = formData.get('password') as string | null;

    try {
        if (!username || !email || !password) throw new Error('Preencha os dados.');
        // VERIFICAÇÕES MAIS SEGURAS DENTRO DO SSR
        if (password.length < 6) throw new Error('Asenha deve ter mais de 6 dígitos.');

        const { url } = USER_POST();
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        })

        if (!response.ok) throw new Error('Email ou usuário já cadastrado.')

        // APÓS USUARIO SE CADASTRAR, FAZ UM LOGIN AUTOMATICO
        const { ok } = await login({ dadosRetorno: null, ok: true, error: '' }, formData);
        if (!ok) throw new Error('Erro ao fazer login.');

        return { dadosRetorno: null, ok: true, error: '' }
    } catch (error: unknown) {
        return ApiError(error);
    }

}

