const sortMediaGroups = (mediaGroups) => {
  let sortedList = [];
  mediaGroups.map((group) => {
    sortedList.push(...group.results);
  });
  return sortedList.sort((m1, m2) => m2.rating - m1.rating);
};

export default sortMediaGroups;
