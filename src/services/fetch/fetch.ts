export type Fetch = {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: { [key: string]: string };
}

export const customFetch = async (endpoint: string, { url, method, body, headers }: Fetch): Promise<any> => {
    const finalUrl = `${url}${endpoint}`;
    const finalHeaders = {
        'Content-Type': 'application/json',
        ...headers,  
    };

    const options: RequestInit = {
        method: method,
        headers: finalHeaders,
    };

    if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
    }

    const response = await window.fetch(finalUrl, options);
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return response.json();
}
