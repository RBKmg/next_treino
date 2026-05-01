import { Metadata } from "next";
import Link from "next/link";

import Feed from "@/(components)/_feed/feed";
import photosGet from "@/(components)/_service/photos-get";
import usuarioLogado from "@/app/(login)/_services/usuario-logado";

export const metadata: Metadata = {
    title: 'Minha conta',
}

export default async function ContaPage() {
    const response = await usuarioLogado();
    const user = response.ok ? response.dadosUsuario : null;

    const photosResponse = await photosGet({ user: user?.username });
    const data = photosResponse.ok ? photosResponse.data : [];
    return (
        <section>
            {data?.length ? (
                <Feed photos={data} user={user?.username} />
            ) : (
                <div>
                    <p
                        style={{ color: '#444', fontSize: '1.25rem', marginBottom: '1rem' }}
                    >
                        Nenhuma foto encontrada.
                    </p>
                    <Link
                        href={'/conta/postar'}
                        className="button"
                        style={{ display: 'inline-block' }}
                    >
                        Postar Foto
                    </Link>
                </div>
            )}
        </section>
    );
}
