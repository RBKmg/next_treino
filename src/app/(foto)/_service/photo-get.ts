'use server';

import { Photo } from "@/(components)/_service/photos-get";
import { PHOTO_GET } from "@/app/(compartilhado)/_functions/api";
import ApiError from "@/app/(compartilhado)/_functions/api-error";


export type Comment = {
    comment_ID: string;
    comment_post_ID: string;
    comment_author: string;
    comment_content: string;
};

export type PhotoData = {
    photo: Photo;
    comments: Comment[];
};

export default async function photoGet(id: string) {
    try {
        const { url } = PHOTO_GET(id);
        const response = await fetch(url, {
            next: {
                revalidate: 60,
                tags: ['photos', 'comment'],
            },
        });
        if (!response.ok) throw new Error('Erro ao pegar a foto.');
        const data = (await response.json()) as PhotoData;
        return { data, ok: true, error: '' };
    } catch (error) {
        return ApiError(error);
    }
}