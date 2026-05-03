import { Metadata } from "next"

import LoginForm from "@/app/(login)/_components/login-form";

export const metadata: Metadata = {
    title: 'Login | Dogs',
    description: 'Logue na sua conta no site Dog'
}

export default async function LoginPage() {

    return (
        <section className="animeLeft">
            <h1 className="title">Logar</h1>

            <LoginForm />
        </section>
    )
}