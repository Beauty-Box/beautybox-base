interface IErrors {
    errors?: Record<string, Record<string, Array<object>>>;
}
declare class Api {
    constructor(baseUrl: string, module: string, token: string, secure?: boolean);
    get<Response>(
        url: string,
        data?: FormData | JSON,
        module?: string
    ): Promise<Response & IErrors>;
    post<Response>(
        url: string,
        data?: FormData | JSON,
        module?: string
    ): Promise<Response & IErrors>;
    put<Response>(
        url: string,
        data?: FormData | JSON,
        module?: string
    ): Promise<Response & IErrors>;
    patch<Response>(
        url: string,
        data?: FormData | JSON,
        module?: string
    ): Promise<Response & IErrors>;
    delete<Response>(
        url: string,
        data?: FormData | JSON,
        module?: string
    ): Promise<Response & IErrors>;
}

export { Api, IErrors };
