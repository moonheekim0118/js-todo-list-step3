const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com/api/teams";

export const HttpMethod = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
};

const headers = { "Content-Type": "application/json" };

export const options = {
  GET: { method: HttpMethod.GET },
  POST: (body = "") => {
    return {
      method: HttpMethod.POST,
      headers,
      body: body ? JSON.stringify(body) : "",
    };
  },
  PUT: (body = "") => {
    return {
      method: HttpMethod.PUT,
      headers,
      body: body ? JSON.stringify(body) : "",
    };
  },
  DELETE: {
    method: HttpMethod.DELETE,
  },
};

export const fetcher = async (endPoint, option = {}) => {
  const response = await fetch(baseUrl + endPoint, option);
  const data = await response.json();
  if (!response.ok) {
    throw response.message;
  }
  return data;
};
