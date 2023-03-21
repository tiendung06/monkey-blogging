export const formatDate = (data) => {
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  return new Date(date).toLocaleDateString("vi-VI");
};
