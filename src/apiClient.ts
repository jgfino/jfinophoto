import axios from "axios";
import {
  ConcertDetails,
  ConcertImage,
  ConcertPreview,
  ContactForm,
} from "./types";

const baseUrl = "https://api.jfinophoto.com";

export const getPortfolio = async () => {
  const images: ConcertImage[] = (await axios.get(`${baseUrl}/portfolio`)).data;
  return images;
};

export const getPortfolioPortraits = async () => {
  const images: ConcertImage[] = (await axios.get(`${baseUrl}/portraits`)).data;
  return images;
};

export const getPortfolioFestivals = async () => {
  const images: ConcertImage[] = (await axios.get(`${baseUrl}/festivals`)).data;
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
