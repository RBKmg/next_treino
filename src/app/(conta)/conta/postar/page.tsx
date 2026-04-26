import { Metadata } from "next"
import ContaPhotoPost from "../../_components/conta-photo-post";

export const metadata: Metadata = {
    title: 'Postar | Minha Conta'
}

export const runtime = 'edge';

export default async function PostarPage() {

    return (
        <main>
            <ContaPhotoPost />
        </main>
    )
}