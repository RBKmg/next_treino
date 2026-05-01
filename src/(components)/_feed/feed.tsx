'use client';

import React from "react";

import photosGet, { Photo } from "@/(components)/_service/photos-get";
import FeedFotos from "./feed-fotos";
import Loading from "@/app/(compartilhado)/_loading/loading";
import styles from './feed.module.css';


export default function Feed({ photos, user }: { photos: Photo[], user?: 0 | string }) {
    const [photosFeed, setPhotosFeed] = React.useState<Photo[]>(photos);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [infinite, setInfinite] = React.useState(photos.length < 6 ? false : true);

    const fetching = React.useRef(false);

    function infiniteScroll() {
        console.log('aconteceu');
        if (fetching.current) return;
        fetching.current = true;
        setLoading(true);

        setTimeout(() => {
            setPage((currentPage) => currentPage + 1);
            fetching.current = false;
            setLoading(false);
        }, 1000);
    }

    React.useEffect(() => {
        if (infinite) {
            window.addEventListener('scroll', infiniteScroll);
            window.addEventListener('wheel', infiniteScroll);
        } else {

            window.removeEventListener('scroll', infiniteScroll);
            window.removeEventListener('wheel', infiniteScroll);
        }
        return () => {
            window.removeEventListener('scroll', infiniteScroll);
            window.removeEventListener('wheel', infiniteScroll);
        }
    }, [infinite]);

    React.useEffect(() => {
        if (page === 1) return;

        async function getPagePhotos(page: number) {
            const actionData = await photosGet({ page, total: 6, user: 0 }, { cache: 'no-store' });

            if (actionData && actionData.ok && actionData.data !== null) {
                const { data } = actionData;
                setPhotosFeed((currentPhotos) => [...currentPhotos, ...data])

                if (data.length < 6) setInfinite(false)
            }
        }
        getPagePhotos(page);
        console.log({ page });
    }, [page])

    return (
        <div>

            <FeedFotos photos={photosFeed} />

            <div className={styles.loadingWrapper}>
                {infinite ? loading && <Loading /> : <p>Nao existem mais postagens.</p> }
            </div>
            
        </div>
    )
}