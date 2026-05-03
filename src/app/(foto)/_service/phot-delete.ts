'use server'

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { LoginState } from "@/app/(login)/_components/login-form";
import { PHOTO_DELETE, PHOTO_POST } from "@/app/(compartilhado)/_functions/api";
import ApiError from "@/app/(compartilhado)/_functions/api-error";


export default async function photoDelete(id: string): Promise<LoginState> {

    const token = (await cookies()).get('token')?.value;

    try {
        if (!token) throw new Error('Token inválido.');

        const { url } = PHOTO_DELETE(id);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        if (!response.ok) throw new Error('Erro ao deletar a foto.')

    } catch (error: unknown) {
        return ApiError(error);
    }

    revalidateTag('photos', {});
    redirect('/conta');
}

