import Link from "next/link";
import styles from "./header.module.css"
import Image from "next/image";
import usuarioLogado from "@/app/(login)/_services/usuario-logado";


export default async function Header() {
    const result = await usuarioLogado();
    const usuario = result.ok ? result.dadosUsuario : null;

    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <Link className={styles.logo} href={'/'}>
                    <Image src={"/assets/dogs.svg"} alt="Dogs" width={28} height={22} priority />
                </Link>


                {usuario ? (
                    <Link className={styles.login} href={'/conta'}>
                        {usuario.username}
                    </Link>
                ) : (
                    <Link className={styles.login} href={'/login'}>Login</Link>
                )}
            </nav>
        </header>
    );
}
