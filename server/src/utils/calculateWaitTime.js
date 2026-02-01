export const calculateWaitTime = (createdAt, claimedAt) => {
  if (!createdAt || !claimedAt) return 0;
  return Math.floor((new Date(claimedAt) - new Date(createdAt)) / 1000);
};
