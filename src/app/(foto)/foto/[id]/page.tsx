export default async function FotoIdPage({ params }: { params: Promise<{ id: string }> }) {


    return (
        <main>
            <h1>Foto id: {(await params).id}</h1>
        </main>
    )
}