import Swal from "sweetalert2";
import apiWrapper from "../services/apiWrapper";

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
  const content = await apiWrapper(
    "api/media?MediaType=" + queryKey[1] + "&PageNumber=" + pageParam
  );

  if (!content.success) {
    Swal.fire({
      ...swalConfig,
      html: `<div style='color:whitesmoke'>Something went wrong while fetching movie data!</div>`,
    });
  }

  return {
    results: content.data,
    next: content.nextPage === null ? undefined : pageParam + 1,
  };
};

export const updateContentRating = async (ratedMediaId, value) => {
  const content = await apiWrapper("api/ratings", "POST", {
    value,
    ratedMediaId,
  });

  if (!content.success) {
    Swal.fire({
      ...swalConfig,
      html: `<div style='color:whitesmoke'>Something went wrong while submitting media rating!</div>`,
    });
    return;
  }

  return content;
};

export const fetchSearchResults = async ({ queryKey, pageParam = 1 }) => {
  const content = await apiWrapper(
    "api/media?SearchPhrase=" + queryKey[1] + "&PageNumber=" + pageParam
  );

  if (!content.success) {
    Swal.fire({
      ...swalConfig,
      html: `<div style='color:whitesmoke'>${content.message}</div>`,
    });
    return;
  }

  return {
    results: content.data,
    next: content.nextPage === null ? undefined : pageParam + 1,
  };
};
