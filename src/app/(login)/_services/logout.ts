'use server';

import { cookies } from "next/headers";

export default async function logout() {

    (await cookies()).delete('token');

    // redirect('/login'); // !!! Erro o toquen permanece na sessão -> jeito correto para tirar o token da sessão
}