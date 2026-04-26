'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import styles from './conta-header.module.css';
import FeedIcone from '@/app/(conta)/_icones/feed-icone';
import EstatisticaIcone from '@/app/(conta)/_icones/estatistica-icone';
import AdicionarIcone from '@/app/(conta)/_icones/adicionar-icone';
import SairIcone from '@/app/(conta)/_icones/sair-icone';
import useMedia from '@/app/(conta)/_hooks/use-media';
import logout from '@/app/(login)/_services/logout';
import { useTokenUsuario } from '@/app/(compartilhado)/_context/provedor-contexto-usuario';


function getTitle(pathname: string) {
    switch (pathname) {
        case '/conta/postar':
            return 'Poste Sua Foto';
        case '/conta/estatisticas':
            return 'Estatísticas';
        default:
            return 'Minha Conta';
    }
}

export default function ContaHeader() {
    const router = useRouter();
    const pathname = usePathname();

    const { setUsuario } = useTokenUsuario();

    const mobile = useMedia('(max-width: 40rem)');

    const [mobileMenu, setMobileMenu] = React.useState(false);


    React.useEffect(() => {
    }, [pathname]);

    async function handleLogout() {
        await logout();
        // window.location.href = '/login';
        setUsuario(null);
        router.push('/login'); // redireciona
        router.refresh(); // garante sync com server (App Router)
    }

    return (
        <header className={styles.header}>
            <h1 className="title">{getTitle(pathname)}</h1>
            {mobile && (
                <button aria-label="Menu" className={
                    `${styles.mobileButton} ${mobileMenu ? styles.mobileButtonActive : ''}`
                }
                    onClick={() => setMobileMenu(!mobileMenu)}>
                </button>
            )}

            <nav className={
                `${mobile ? styles.navMobile : styles.nav} ${mobileMenu ? styles.navMobileActive : ''}`
            }>

                <Link href="/conta"
                    className={pathname === '/conta' ? 'active' : ''} onClick={() => setMobileMenu(false)}>
                    <FeedIcone />
                    {mobile && 'Minhas Fotos'}
                </Link>

                <Link href="/conta/estatisticas"
                    className={pathname === '/conta/estatisticas' ? 'active' : ''} onClick={() => setMobileMenu(false)}>
                    <EstatisticaIcone />
                    {mobile && 'Estatísticas'}
                </Link>

                <Link href="/conta/postar"
                    className={pathname === '/conta/postar' ? 'active' : ''} onClick={() => setMobileMenu(false)}>
                    <AdicionarIcone />
                    {mobile && 'Adicionar Foto'}
                </Link>

                <button onClick={handleLogout}>
                    <SairIcone />
                    {mobile && 'Sair'}
                </button>
            </nav>
        </header>
    );
}
