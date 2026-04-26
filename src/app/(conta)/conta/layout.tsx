import ContaHeader from "@/app/(conta)/_components/conta-header";

export default async function LayoutConta({ children }: { children: React.ReactNode }) {

    return (
        <div className="container">
            <ContaHeader />

            {children}
        </div>
    )
}