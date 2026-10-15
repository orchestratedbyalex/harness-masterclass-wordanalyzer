export interface IError {
    title: string;
    message: string;
}

// Caught values are typed `unknown`, so normalize them into an IError.
export function toAppError(err: unknown): IError {
    return {
        title: 'Something went wrong',
        message: err instanceof Error ? err.message : String(err)
    };
}
