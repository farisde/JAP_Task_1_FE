const formatCastMembers = (castMembers) => {
  return castMembers.map((c) => c.name).join(", ");
};

export default formatCastMembers;
