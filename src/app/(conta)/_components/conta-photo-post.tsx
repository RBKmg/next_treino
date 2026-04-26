'use client';

import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

import styles from './conta-photo-post.module.css'
import Button from "@/app/(login)/_components/_button/button";
import Input from "@/app/(login)/_components/_input/input";
import ErrorMessage from "@/app/(login)/_components/error-messages";
import photoCadastro from "../_service/photo-cadastro";


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
                <Button>Enviar</Button>
            )}
        </>
    )
}

export default function ContaPhotoPost() {
    const [retornoAction, action] = useActionState<LoginState, FormData>(photoCadastro, {
        ok: false,
        error: '',
        dadosRetorno: null
    });

    const [img, setImg] = React.useState('');
    function handleImageChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        if (target.files) {
            setImg(URL.createObjectURL(target.files[0]))
        }

        console.log(target.files);
    }

    return (
        <>
            <section className={`${styles.photoPost} animeLeft`}>
                <form action={action} >
                    <Input label="Nome" name="nome" type="text" />
                    <Input label="Peso" name="peso" type="number" />
                    <Input label="Idade" name="idade" type="number" />

                    <input onChange={handleImageChange}
                        type="file" name="img" id="img" className={styles.file} />

                    <ErrorMessage error={retornoAction.error} />
                    <FormButton />
                </form>

                <div>
                    <div className={styles.preview} style={{ backgroundImage: `url(${img})` }}>

                    </div>
                </div>
            </section>
        </>
    )
}