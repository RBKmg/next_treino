import { Photo } from "@/(components)/_service/photos-get";
import Image from "next/image";
import Link from "next/link";
import styles from './feed.module.css';

export default function FeedFotos({ photos }: { photos: Photo[] }) {

    return (

        <ul className={`${styles.feed} animeLeft`}>
            {photos.map((photo, index) => (
                <li className={styles.photo} key={photo.id + index}>{photo.title}
                    <Link href={`/foto/${photo.id}`} scroll={false}>
                        <Image src={photo.src}
                            alt={photo.title}
                            width={1500}
                            height={1500}
                            sizes="80vw"
                            priority />
                        <span className={styles.visualizacao}>{photo.acessos}</span>
                    </Link>
                </li>))
            }
        </ul>

    )
}