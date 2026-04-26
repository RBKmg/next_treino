import { Metadata } from "next"

import LoginResetForm from "../../_components/login-reset-form"

export const metadata: Metadata = {
    title: 'Resetar a senha | Dogs',
    description: 'Resete a sua senha.'
}

type ResetSearchParams = {
    searchParams: {
        key: string;
        login: string;
    }
}

export default async function LoginResetPage({ searchParams }: ResetSearchParams) {
    console.log(searchParams);

    return (
        <div className="animeLeft">
            <h1 className="title">Resete a senha</h1>

            <LoginResetForm keyToken={searchParams.key} login={searchParams.login} />
        </div>
    )
}