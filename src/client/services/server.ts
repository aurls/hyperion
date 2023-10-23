const API_BASE = 'api/v1';

const send = async <T = unknown>(uri: string, data: any = null, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(
    `${API_BASE}/${uri}`,
    {
      ...options,
      body: data && JSON.stringify(data)
    }
  );

  if (response.status !== 200) {
    throw new Error(`Could not fetch ${uri}, received ${response.status}`);
  }

  return response.json();
};

const get = async <T = unknown>(uri: string): Promise<T> => {
  return send<T>(uri);
};

const post = async <T = unknown>(uri: string, data: any): Promise<T> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return send<T>(uri, data, options);
};

export default {
  get,
  post
};
