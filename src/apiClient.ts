import axios from "axios";
import { Concert, ConcertImage, ConcertWithPhotos, ContactForm } from "./types";

const baseUrl = "https://api.jfinophoto.com";

export const getLivePortfolio = async () => {
  const images: ConcertImage[] = (await axios.get(`${baseUrl}/live`)).data;
  return images;
};

export const getPortraits = async () => {
  const images: ConcertImage[] = (await axios.get(`${baseUrl}/portraits`)).data;
  return images;
};

export const getFestivals = async () => {
  const images: ConcertImage[] = (await axios.get(`${baseUrl}/festivals`)).data;
  return images;
};

export const getGalleries = async (type: "concerts" | "festivals") => {
  const concerts: Concert[] = (await axios.get(`${baseUrl}/galleries/${type}`))
    .data;
  return concerts;
};

export const getGallery = async (
  concertId: string,
  artistId: string,
  type: "concerts" | "festivals"
) => {
  const concert: ConcertWithPhotos = (
    await axios.get(`${baseUrl}/galleries/${type}/${concertId}/${artistId}`)
  ).data;
  return concert;
};

export const sendContactForm = async (formData: ContactForm) => {
  await axios.post(`${baseUrl}/contact`, formData);
};
