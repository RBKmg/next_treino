'use server'

import { redirect } from "next/navigation";

import { LoginState } from "@/app/(login)/_components/login-form";
import ApiError from "@/app/(compartilhado)/_functions/api-error";
import { PASSWORD_RESET } from "@/app/(compartilhado)/_functions/api";

export default async function loginReset(prevState: LoginState, formData: FormData): Promise<LoginState> {

    const login = formData.get('login') as string | null;
    const key = formData.get('key') as string | null;
    const password = formData.get('password') as string | null;

    try {
        if (!login || !key || !password) throw new Error('Preencha os dados.');

        const { url } = PASSWORD_RESET();
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        })

        if (!response.ok) throw new Error('Não autorizado.')
    } catch (error: unknown) {
        return ApiError(error);
    }

    // sem return dentro do try!!!!
    redirect('/login');
}