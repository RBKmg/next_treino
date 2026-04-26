export default function ApiError(error: unknown): { dadosRetorno: null; ok: false; error: string } {

    if (error instanceof Error) {
        return { dadosRetorno: null, ok: false, error: error.message }
    } else {
        return { dadosRetorno: null, ok: false, error: 'Erro genérico' }
    }
}

