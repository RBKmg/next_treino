'use client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import Button from "../../(compartilhado)/_components/button/button";
import Input from "../../(compartilhado)/_components/_input/input";
import ErrorMessage from "./error-messages";
import perdeuSenha from "../_services/perdeu-senha";
import styles from './login-form.module.css';

export type LoginState = {
    ok: boolean;
    error: string;
    dadosRetorno: null;
};

function FormButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled={pending}>Enviando...</Button>
            ) : (
                <Button>Enviar Email</Button>
            )}
        </>
    )
}


export default function LoginPedeuForm() {
    const [retornoAction, action] = useActionState<LoginState, FormData>(perdeuSenha, {
        ok: false,
        error: '',
        dadosRetorno: null
    });

    const url = typeof window !== "undefined" ? window.location.href.replace("perdeu", "resetar") : "";

    return (
        <>
            <form action={action} className={styles.form}>
                <Input label="Email / Uusário" name="login" type="email" />

                {/* Pegar a url */}
                <input type="hidden" name="url" value={url} readOnly />


                <ErrorMessage error={retornoAction.error} />

                {retornoAction.ok ? (
                    <p style={{ color: '#4c1' }}>Email enviando.</p>
                ) : (
                    <FormButton />
                )}
            </form>
        </>
    )
}