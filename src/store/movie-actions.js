import { movieActions } from "./movie-slice";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const fetchMediaList = async (pageParam, mediaType) => {
  const response = await fetch(
    REACT_APP_API_URL +
      "api/media?MediaType=" +
      mediaType +
      "&PageNumber=" +
      pageParam
  );

  if (!response.ok) {
    throw new Error("Something went wrong while fetching movie data!");
  }

  const content = await response.json();

  return {
    results: content.data,
    next: content.nextPage === null ? undefined : pageParam + 1,
  };
};

export const fetchMovieList = async ({ pageParam = 1 }) => {
  return await fetchMediaList(pageParam, 1);
};

export const fetchSeriesList = async ({ pageParam = 1 }) => {
  return await fetchMediaList(pageParam, 2);
};

export const updateContentRating = async (ratedMediaId, value) => {
  const response = await fetch(REACT_APP_API_URL + "api/ratings", {
    method: "POST",
    body: JSON.stringify({ value, ratedMediaId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong while submitting media rating!");
  }

  return await response.json();
};

export const sendSearchQuery = async ({ pageParam = 1 }, searchPhrase) => {
  const response = await fetch(
    REACT_APP_API_URL +
      "api/media?SearchPhrase=" +
      searchPhrase +
      "&PageNumber=" +
      pageParam
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const content = await response.json();

  return {
    results: content.data,
    next: content.nextPage === null ? undefined : pageParam + 1,
  };
};
