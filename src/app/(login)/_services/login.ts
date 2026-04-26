'use server'

import { cookies } from "next/headers";

import { LoginState } from "@/app/(login)/_components/login-form";
import { TOKEN_POST } from "@/app/(compartilhado)/_functions/api";
import ApiError from "@/app/(compartilhado)/_functions/api-error";

export default async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {

    const username = formData.get('username') as string | null;
    const password = formData.get('password') as string | null;

    try {
        if (!username || !password) throw new Error('Preencha os dados');
        const { url } = TOKEN_POST();
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        })

        if (!response.ok) throw new Error('Senha ou usuário inválidos')

        const tokenAPI = await response.json();
        (await cookies()).set('token', tokenAPI.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24
        });
        return { dadosRetorno: null, ok: true, error: '' }

    } catch (error: unknown) {
        return ApiError(error);
    }

}

