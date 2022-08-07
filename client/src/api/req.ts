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
