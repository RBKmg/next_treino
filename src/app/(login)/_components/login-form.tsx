'use client';

import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

import login from "@/app/(login)/_services/login"
import Button from "./_button/button";
import Input from "./_input/input";
import ErrorMessage from "./error-messages";
import styles from './login-form.module.css';
import { useTokenUsuario } from "@/app/(compartilhado)/_context/provedor-contexto-usuario";



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
                <Button>Entrar</Button>
            )}
        </>
    )
}

export default function LoginForm() {
    const [retornoAction, action] = useActionState<LoginState, FormData>(login, {
        ok: false,
        error: '',
        dadosRetorno: null
    });

    React.useEffect(() => {
        if (retornoAction.ok) window.location.href = '/conta';

    }, [retornoAction.ok]);

    const usuario = useTokenUsuario(); // !!! TESTE PARA VER QUE APOS LOGOUT, AINDA CONTINUA NO PROVEDOR

    return (
        <>
            {usuario.usuario?.email}
            <form action={action} className={styles.form}>
                <Input label="Usuário" name="username" type="text" />
                <Input label="Senha" name="password" type="password" />

                <ErrorMessage error={retornoAction.error} />
                <FormButton />
            </form>

            <Link className={styles.perdeu} href="/login/perdeu">
                Perdeu a senha
            </Link>

            <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Cadastre-se</h2>
                <p>Ainda não possui conta cadastre-se no site.</p>

                <Link className="button" href="/login/criar">Cadastro</Link>
            </div>
        </>
    )
}