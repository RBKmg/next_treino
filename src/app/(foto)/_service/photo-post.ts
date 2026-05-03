'use server'

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { LoginState } from "@/app/(login)/_components/login-form";
import { PHOTO_POST } from "@/app/(compartilhado)/_functions/api";
import ApiError from "@/app/(compartilhado)/_functions/api-error";


export default async function photoPost(prevState: LoginState, formData: FormData): Promise<LoginState> {

    const token = (await cookies()).get('token')?.value;

    const nome = formData.get('nome') as string | null;
    const idade = formData.get('idade') as string | null;
    const peso = formData.get('peso') as string | null;
    const img = formData.get('img') as File;

    try {
        if (!token || !nome || !idade || !peso || img.size === 0) throw new Error('Preencha os dados.');

        const { url } = PHOTO_POST();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: formData,
        })

        if (!response.ok) throw new Error('Já cadastrado')

    } catch (error: unknown) {
        return ApiError(error);
    }

    revalidateTag('photos', {});
    redirect('/conta');
}

