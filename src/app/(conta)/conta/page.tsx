
import FeedFotos from "@/(components)/_feed/feed-fotos";
import photosGet from "@/(components)/_service/photos-get";
import usuarioLogado from "@/app/(login)/_services/usuario-logado";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Minha conta',
}

export default async function ContaPage() {
    const usuario = await usuarioLogado();

    if (!usuario.ok || !('dadosUsuario' in usuario)) {
        return <div>Usuário não logado</div>;
    }

    const response = await photosGet({
        user: usuario.dadosUsuario.username
    });

    if (!response.ok || !Array.isArray(response.data)) {
        return <div>Erro ao carregar fotos</div>;
    }

    if (response.data.length === 0) {
        return <div>Não tem nenhuma foto.</div>;
    }

    return (
        <div>
            <FeedFotos photos={response.data} />
        </div>
    );
}
