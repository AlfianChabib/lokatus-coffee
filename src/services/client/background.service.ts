"use client";

import { BackgroundsType } from "@/app/api/[[...route]]/backgrounds";
import { hc } from "hono/client";

export const bgClient = hc<BackgroundsType>(`${process.env.NEXT_PUBLIC_APP_URL!}/api/backgrounds`, {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const postBackground = async (payload: File) => {
  const formData = new FormData();
  formData.append("image", payload);

  const response = await bgClient.test.$post({
    form: { image: formData.get("image") },
  });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};

export const getBackgrounds = async () => {
  const response = await bgClient.index.$get();

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};

export const updateBackground = async (payload: { id: string; image: File }) => {
  const formData = new FormData();
  formData.append("image", payload.image);

  const response = await bgClient[":id"].$patch({
    form: { image: formData.get("image") },
    param: { id: payload.id },
  });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};

export const deleteBackground = async (id: string) => {
  const response = await bgClient[":id"].$delete({ param: { id } });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};
