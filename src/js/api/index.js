const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com/api/teams";

const HttpMethod = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
};

const headers = { "Content-Type": "application/json" };

const endPoints = {
  addTeam: () => "/",
  loadTeam: (teamId) => `/${teamId}`,
  loadTeamList: () => "/",
  removeTeam: (teamId) => `/${teamId}`,
  addMember: (teamId) => `/${teamId}/members`,
  loadTodoList: (teamId, memberId) => `/${teamId}/members/${memberId}`,
  addTodo: (teamId, memberId) => `/${teamId}/members/${memberId}/items`,
  removeTodo: (teamId, memberId, itemId) =>
    `/${teamId}/members/${memberId}/items/${itemId}`,
  toggleTodo: (teamId, memberId, itemId) =>
    `/${teamId}/members/${memberId}/items/${itemId}/toggle`,
  updateTodo: (teamId, memberId, itemId) =>
    `/${teamId}/members/${memberId}/items/${itemId}`,
  updatePriority: (teamId, memberId, itemId) =>
    `/${teamId}/members/${memberId}/items/${itemId}/priority`,
  removeAllTodo: (teamId, memberId) => `/${teamId}/members/${memberId}/items/`,
};

const options = {
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

const request = async (endPoint, option = {}) => {
  const response = await fetch(baseUrl + endPoint, option);
  const data = await response.json();
  if (!response.ok) {
  }
  return data;
};

export const teamAPI = {
  addTeam: (name) => request(endPoints.addTeam(), options.POST({ name })),
  loadTeam: (teamId) => request(endPoints.loadTeam(teamId), options.GET),
  loadTeamList: () => request(endPoints.loadTeamList(), options.GET),
  removeTeam: (teamId) => request(endPoints.removeTeam(teamId), options.DELETE),
};

export const memberAPI = {
  addMember: (teamId, name) =>
    request(endPoints.addMember(teamId), options.POST({ name })),
  loadTodoList: (teamId, memberId) =>
    request(endPoints.loadTodoList(teamId, memberId), options.GET),
  addTodo: (teamId, memberId, contents) =>
    request(endPoints.addTodo(teamId, memberId), options.POST({ contents })),
  removeTodo: (teamId, memberId, itemId) =>
    request(endPoints.removeTodo(teamId, memberId, itemId), options.DELETE),
  toggleTodo: (teamId, memberId, itemId) =>
    request(endPoints.toggleTodo(teamId, memberId, itemId), options.PUT()),
  updateTodo: (teamId, memberId, itemId, contents) =>
    request(
      endPoints.updateTodo(teamId, memberId, itemId),
      options.PUT({ contents })
    ),
  updatePriority: (teamId, memberId, itemId, priority) =>
    request(
      endPoints.updatePriority(teamId, memberId, itemId),
      options.PUT({ priority })
    ),
  removeAllTodo: (teamId, memberId) =>
    request(endPoints.removeAllTodo(teamId, memberId), options.DELETE),
};
