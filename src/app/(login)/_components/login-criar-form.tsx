'use client';

import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

import Button from "./_button/button";
import Input from "./_input/input";
import ErrorMessage from "./error-messages";
import styles from './login-form.module.css';
import usuarioCadastro from "../_services/usuario-cadastro";



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
                <Button>Cadastrar</Button>
            )}
        </>
    )
}

export default function LoginCriarForm() {
    const [retornoAction, action] = useActionState<LoginState, FormData>(usuarioCadastro, {
        ok: false,
        error: '',
        dadosRetorno: null
    });

    React.useEffect(() => {
        if (retornoAction.ok) window.location.href = '/conta';

    }, [retornoAction.ok]);

    return (
        <>
            <form action={action} className={styles.form}>
                <Input label="Usuário" name="username" type="text" />
                <Input label="Email" name="email" type="email" />
                <Input label="Senha" name="password" type="password" />

                <ErrorMessage error={retornoAction.error} />
                <FormButton />
            </form>
        </>
    )
}