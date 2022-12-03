import axios from "axios";
import {
  ConcertDetails,
  ConcertImage,
  ConcertPreview,
  ContactForm,
} from "./types";

const baseUrl = "http://localhost:3001";

export const getPortolio = async () => {
  const images: ConcertImage[] = (await axios.get(`${baseUrl}/portfolio`)).data;
  return images;
};

export const getConcerts = async () => {
  const concerts: ConcertPreview[] = (await axios.get(`${baseUrl}/concerts`))
    .data;
  return concerts;
};

export const getConcert = async (id: string) => {
  const concert: ConcertDetails = (await axios.get(`${baseUrl}/concerts/${id}`))
    .data;
  return concert;
};

export const sendContactForm = async (formData: ContactForm) => {
  await axios.post(`${baseUrl}/contact`, formData);
};
