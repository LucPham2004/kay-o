import axiosClient from "axios";
import { Mutex } from "async-mutex";

interface AccessTokenResponse {
    access_token: string;
}

/**
 * Creates an initial 'axios' instance with custom settings.
 */

const instance = axiosClient.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});


const mutex = new Mutex();
const NO_RETRY_HEADER = 'x-no-retry';

const handleRefreshToken = async (): Promise<string | null | undefined> => {
    return await mutex.runExclusive(async () => {
        const res = await instance.get<AccessTokenResponse>('/api/auths/refresh');
        if (res && res.data) return res.data?.access_token;
        else return null;
    });
};

instance.interceptors.request.use(function (config) {
    const excludedEndpoints = ['/api/auths/login', '/api/auths/register', '/api/auths/logout'];
    const shouldExcludeToken = excludedEndpoints.some(endpoint =>
        config.url?.endsWith(endpoint)
    );

    if (!shouldExcludeToken && typeof window !== "undefined" && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }

    if (!config.headers.Accept && config.headers["Content-Type"]) {
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
});

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.config && error.response
            && +error.response.status === 401
            && error.config.url !== '/api/auths/login'
            && !error.config.headers[NO_RETRY_HEADER]
        ) {
            const access_token = await handleRefreshToken();
            error.config.headers[NO_RETRY_HEADER] = 'true'
            if (access_token) {
                error.config.headers['Authorization'] = `Bearer ${access_token}`;
                localStorage.setItem('access_token', access_token)
                return instance.request(error.config);
            }
        }

        if (
            error.config && error.response
            && +error.response.status === 400
            && error.config.url === '/api/auths/refresh'
            && location.pathname.startsWith("/admin")
        ) {
            const message = error?.response?.data?.error ?? "Có lỗi xảy ra, vui lòng login.";
            alert(message)
            window.location.href = '/login';
        }

        return error?.response?.data ?? Promise.reject(error);
    }
);

export default instance;

