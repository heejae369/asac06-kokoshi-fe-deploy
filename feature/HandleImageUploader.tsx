"use client";
import { useState } from "react";
export const handleImageUpload = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!event.target.files) return;

  const newImages = Array.from(event.target.files);

  setImages([...images, ...newImages]);
  setIsModalOpen(false);

  return handleImageUpload;
  isModalOpen;
  setIsModalOpen;
};
