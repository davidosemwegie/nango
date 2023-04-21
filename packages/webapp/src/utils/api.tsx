import { toast } from 'react-toastify';
import { useSignout } from './user';

function requestErrorToast() {
    toast.error('Request error...', { position: toast.POSITION.BOTTOM_CENTER });
}

function serverErrorToast() {
    toast.error('Server error...', { position: toast.POSITION.BOTTOM_CENTER });
}

function getHeaders(): Record<string, string> {
    return { 'Content-Type': 'application/json' };
}

export function useLogoutAPI() {
    return async () => {
        const options = {
            method: 'POST',
            headers: getHeaders()
        };

        await fetch('/api/v1/logout', options);
    };
}

export function useSignupAPI() {
    return async (name: string, email: string, password: string) => {
        try {
            const options = {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ name: name, email: email, password: password })
            };

            return fetch('/api/v1/signup', options);
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useSigninAPI() {
    return async (email: string, password: string) => {
        try {
            const options = {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ email: email, password: password })
            };

            let res = await fetch('/api/v1/signin', options);

            if (res.status !== 200 && res.status !== 401) {
                return serverErrorToast();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useHostedSigninAPI() {
    return async () => {
        try {
            let res = await fetch('/api/v1/basic', { headers: getHeaders() });

            if (res.status !== 200 && res.status !== 401) {
                return serverErrorToast();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useGetProjectInfoAPI() {
    const signout = useSignout();

    return async () => {
        try {
            let res = await fetch('/api/v1/account', { headers: getHeaders() });

            if (res.status === 401) {
                return signout();
            }

            if (res.status !== 200) {
                return serverErrorToast();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useEditCallbackUrlAPI() {
    const signout = useSignout();

    return async (callbackUrl: string) => {
        try {
            const options = {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ callback_url: callbackUrl })
            };

            let res = await fetch('/api/v1/account/callback', options);

            if (res.status === 401) {
                return signout();
            }

            if (res.status !== 200) {
                return serverErrorToast();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useGetIntegrationListAPI() {
    const signout = useSignout();

    return async () => {
        try {
            let res = await fetch('/api/v1/integration', { headers: getHeaders() });

            if (res.status === 401) {
                return signout();
            }

            if (res.status !== 200) {
                return serverErrorToast();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useGetIntegrationDetailsAPI() {
    const signout = useSignout();

    return async (providerConfigKey: string) => {
        try {
            let res = await fetch(`/api/v1/integration/${encodeURIComponent(providerConfigKey)}`, {
                headers: getHeaders()
            });

            if (res.status === 401) {
                return signout();
            }

            if (res.status !== 200) {
                return serverErrorToast();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useCreateIntegrationAPI() {
    const signout = useSignout();

    return async (provider: string, providerConfigKey: string, clientId: string, clientSecret: string, scopes: string) => {
        try {
            const options = {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    provider: provider,
                    provider_config_key: providerConfigKey,
                    client_id: clientId,
                    client_secret: clientSecret,
                    scopes: scopes
                })
            };

            let res = await fetch('/api/v1/integration', options);

            if (res.status === 401) {
                return signout();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useEditIntegrationAPI() {
    const signout = useSignout();

    return async (provider: string, providerConfigKey: string, clientId: string, clientSecret: string, scopes: string) => {
        try {
            const options = {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({
                    provider: provider,
                    provider_config_key: providerConfigKey,
                    client_id: clientId,
                    client_secret: clientSecret,
                    scopes: scopes
                })
            };

            let res = await fetch('/api/v1/integration', options);

            if (res.status === 401) {
                return signout();
            }

            if (res.status !== 200) {
                return serverErrorToast();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useDeleteIntegrationAPI() {
    const signout = useSignout();

    return async (providerConfigKey: string) => {
        try {
            let res = await fetch(`/api/v1/integration/${encodeURIComponent(providerConfigKey)}`, {
                headers: getHeaders(),
                method: 'DELETE'
            });

            if (res.status === 401) {
                return signout();
            }

            if (res.status !== 200) {
                return serverErrorToast();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useGetProvidersAPI() {
    const signout = useSignout();

    return async () => {
        try {
            let res = await fetch('/api/v1/provider', { headers: getHeaders() });

            if (res.status === 401) {
                return signout();
            }

            if (res.status !== 200) {
                return serverErrorToast();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useGetConnectionListAPI() {
    const signout = useSignout();

    return async () => {
        try {
            let res = await fetch('/api/v1/connection', { headers: getHeaders() });

            if (res.status === 401) {
                return signout();
            }

            if (res.status !== 200) {
                return serverErrorToast();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useGetConnectionDetailsAPI() {
    const signout = useSignout();

    return async (connectionId: string, providerConfigKey: string) => {
        try {
            let res = await fetch(`/api/v1/connection/${encodeURIComponent(connectionId)}?provider_config_key=${encodeURIComponent(providerConfigKey)}`, {
                headers: getHeaders()
            });

            if (res.status === 401) {
                return signout();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useDeleteConnectionAPI() {
    const signout = useSignout();

    return async (connectionId: string, providerConfigKey: string) => {
        try {
            let res = await fetch(`/api/v1/connection/${encodeURIComponent(connectionId)}?provider_config_key=${encodeURIComponent(providerConfigKey)}`, {
                headers: getHeaders(),
                method: 'DELETE'
            });

            if (res.status === 401) {
                return signout();
            }

            if (res.status !== 200) {
                return serverErrorToast();
            }

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useRequestPasswordResetAPI() {
    return async (email: string) => {
        try {
            let res = await fetch(`/api/v1/forgot-password`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({ email: email })
            });

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}

export function useResetPasswordAPI() {
    return async (token: string, password: string) => {
        try {
            let res = await fetch(`/api/v1/reset-password`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({ password: password, token: token })
            });

            return res;
        } catch (e) {
            requestErrorToast();
        }
    };
}