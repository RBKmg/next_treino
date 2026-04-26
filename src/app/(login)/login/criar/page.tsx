import { Metadata } from "next"

import LoginCriarForm from "../../_components/login-criar-form"

export const metadata: Metadata = {
    title: 'Crie sua conta',
    description: 'Crie sua conta no site Dog'
}

export default async function CriarPage() {

    return (
        <div className="animeleft">
            <h1 className="title">Cadastre-se</h1>

            <LoginCriarForm />
        </div>
    )
}