import type { Metadata } from "next";
import "./globals.css";

import Header from "@/(components)/_header/header";
import Footer from "@/(components)/_footer/footer";
import { ProvedorContextoUsuario } from "@/context/provedor-contexto-usuario";
import { type_second } from "@/functions/fonte";
import usuarioLogado from "./(login)/_services/usuario-logado";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Rede social para cachorros",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const result = await usuarioLogado();
  const dadosUsuarioContexto = result.ok ? result.dadosUsuario : null;

  return (
    <html lang="pt-BR">
      <body className={type_second.variable}>

        <ProvedorContextoUsuario usuario={dadosUsuarioContexto}>
          <div className="App">
            <Header />
            <main className="AppBody">
              {children}
            </main>
            <Footer />
          </div>
        </ProvedorContextoUsuario>

      </body>


    </html>
  );
}
