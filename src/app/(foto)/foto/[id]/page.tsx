import { notFound } from "next/navigation";
import photoGet from "../../_service/photo-get";
import PhotoContent from "./_components/photo-content";
import usuarioLogado from "@/app/(login)/_services/usuario-logado";

type FotoIdParams = {
    params: Promise<{ id: string }>;
};

async function getPhoto(id: string) {
    const result = await photoGet(id);

    if (!result.ok || !("data" in result)) {
        return null;
    }

    return result.data;
}

async function getUser() {
    const result = await usuarioLogado();

    return result.ok ? result.dadosUsuario : null;
}

export async function generateMetadata({ params }: FotoIdParams) {
    const { id } = await params;
    const data = await getPhoto(id);

    if (!data) return { title: "Foto" };

    return { title: data.photo.title };
}

export default async function FotoIdPage({ params }: FotoIdParams) {
    const { id } = await params;

    const [data, user] = await Promise.all([
        getPhoto(id),
        getUser(),
    ]);

    if (!data) return notFound();

    return (
        <section className="container mainContainer">
            <PhotoContent data={data} single={true} user={user} />
        </section>
    );
}