import { jsonApi } from "@/util/utilAxions";

const GetTodosList = async () => {
  const response = await jsonApi.get("/todos");

  return response.data;
};

const TodosCreateList = async (title: string) => {
  const response = await jsonApi.post("/todos", {
    title,
  });

  return response.data;
};

const TodosEditList = async (id: string, title: string) => {
  const response = await jsonApi.patch(`/todos/${id}`, { title });

  return response.data;
};

const TodosDeleteList = async (id: string) => {
  const response = await jsonApi.delete(`/todos/${id}`);

  return response.data;
};

const api = {
  GetTodosList,
  TodosCreateList,
  TodosEditList,
  TodosDeleteList,
};

export default api;
