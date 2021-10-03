import Swal from "sweetalert2";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const swalConfig = {
  title: "<div style='color:whitesmoke'>Sign Up error</div>",
  icon: "error",
  backdrop: true,
  showConfirmButton: true,
  confirmButtonColor: "#eb0028",
  focusConfirm: false,
  background: "#2C2C2C",
};

export const fetchMediaList = async ({ queryKey, pageParam = 1 }) => {
  const response = await fetch(
    REACT_APP_API_URL +
      "api/media?MediaType=" +
      queryKey[1] +
      "&PageNumber=" +
      pageParam
  );

  if (!response.ok) {
    Swal.fire({
      ...swalConfig,
      html: `<div style='color:whitesmoke'>Something went wrong while fetching movie data!</div>`,
    });
  }

  const content = await response.json();

  return {
    results: content.data,
    next: content.nextPage === null ? undefined : pageParam + 1,
  };
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
    Swal.fire({
      ...swalConfig,
      html: `<div style='color:whitesmoke'>Something went wrong while submitting media rating!</div>`,
    });
  }

  return await response.json();
};

export const fetchSearchResults = async ({ queryKey, pageParam = 1 }) => {
  const response = await fetch(
    REACT_APP_API_URL +
      "api/media?SearchPhrase=" +
      queryKey[1] +
      "&PageNumber=" +
      pageParam
  );

  if (!response.ok) {
    Swal.fire({
      ...swalConfig,
      html: `<div style='color:whitesmoke'>${response.statusText}</div>`,
    });
  }

  const content = await response.json();

  return {
    results: content.data,
    next: content.nextPage === null ? undefined : pageParam + 1,
  };
};
