import { Photo } from "@/(components)/_service/photos-get";
import FeedFotos from "./feed-fotos";

export default async function Feed({ photos }: { photos: Photo[] }) {

    return (
        <div>

            <FeedFotos photos={photos} />

        </div>
    )
}