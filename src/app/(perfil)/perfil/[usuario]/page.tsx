export default async function PerfilUsuarioPage({ params }: { params: Promise<{ usuario: string }> }) {

    return (
        <main>
            <h1>Perfil usuario: {(await params).usuario}</h1>
        </main>
    )
}