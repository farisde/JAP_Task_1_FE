const formatReleaseDate = (date) => {
  return new Date(date)
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");
};

export default formatReleaseDate;
