'use client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import Button from "./_button/button";
import Input from "./_input/input";
import ErrorMessage from "./error-messages";
import styles from './login-form.module.css';
import loginReset from "../_services/login-reset";


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
                <Button disabled={pending}>Resetando...</Button>
            ) : (
                <Button>Resetar senha</Button>
            )}
        </>
    )
}


export default function LoginResetForm({ keyToken, login }: { keyToken: string; login: string; }) {
    const [retornoAction, action] = useActionState<LoginState, FormData>(loginReset, {
        ok: false,
        error: '',
        dadosRetorno: null
    });

    const url = typeof window !== "undefined" ? window.location.href.replace("perdeu", "resetar") : "";

    return (
        <>
            <form action={action} className={styles.form}>
                <Input label="Nova Senha" name="password" type="password" />

                <input type="hidden" name="login" value="login" readOnly />
                <input type="hidden" name="key" value="keyToken" readOnly />

                <ErrorMessage error={retornoAction.error} />

                <FormButton />
            </form>
        </>
    )
}