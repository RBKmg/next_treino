'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Usuario } from '@/app/(login)/_services/usuario-logado';
import { PhotoData } from '@/app/(foto)/_service/photo-get';
import styles from './photo-content.module.css';
import PhotoDelete from './photo-delete';

type Props = {
    data: PhotoData;
    single: boolean;
    user: Usuario | null; // ideal: tipar corretamente
};

const PhotoContent = ({ data, single, user }: Props) => {
    const { photo, comments } = data;

    return (
        <div className={`${styles.photo} ${single ? styles.single : ''}`}>
            <div className={styles.img}>
                <Image src={photo.src} alt={photo.title} width={1000} height={1000} />
            </div>
            <div className={styles.details}>
                <div>
                    <p className={styles.author}>
                        {user && user.username === photo.author ? (
                            <PhotoDelete id={String(photo.id)} />
                        ) : (
                            <Link href={`/perfil/${photo.author}`}>@{photo.author}</Link>
                        )}
                        <span className={styles.visualizacoes}>{photo.acessos}</span>
                    </p>
                    <h1 className="title">
                        <Link href={`/foto/${photo.id}`}>{photo.title}</Link>
                    </h1>
                    <ul className={styles.attributes}>
                        <li>{photo.peso} kg</li>
                        <li>{photo.idade} anos</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PhotoContent;