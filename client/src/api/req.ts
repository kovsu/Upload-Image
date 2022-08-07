import { baseUrl } from "./config";

export const uploadImage = async (filedname: File) => {
  const formData = new FormData();
  formData.append("filedname", filedname);

  const resp = await fetch(baseUrl + "/upload", {
    method: "post",
    body: formData,
  });

  const data = await resp.json();

  return data;
};

export const getAll = async () => {
  const resp = await fetch(baseUrl + "/allImages");
  const data = await resp.json();
  
  return data;
};

export const deleteImage = async (filedname: string) => {
  const resp = await fetch(baseUrl + "/delete/" + filedname);
  const data = await resp.json();

  return data;
};
