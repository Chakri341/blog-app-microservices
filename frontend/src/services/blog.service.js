import api from "../lib/axios";

export const getBlogs = async () => {
  const response = await api.get("/blogs");

  return response.data;
};

export const getSingleBlog = async (id) => {
  const response = await api.get(`/blogs/${id}`);

  return response.data;
};

export const createBlog = async (data) => {
  const response = await api.post(
    "/blogs",

    data,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const getComments = async (blogId) => {
  const response = await api.get(`/comments/${blogId}`);

  return response.data;
};

export const createComment = async (data) => {
  const response = await api.post("/comments", data);

  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}`);

  return response.data;
};

export const updateBlog = async ({
  id,

  formData,
}) => {
  const response = await api.put(
    `/blogs/${id}`,

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
