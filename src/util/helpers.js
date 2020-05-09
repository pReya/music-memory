export const shuffleArray = (array) => {
  const clonedArray = JSON.parse(JSON.stringify(array));
  for (let i = clonedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
  }
  return clonedArray;
};

export const getApiTokenFromStorage = () => {
  const storageToken = window.localStorage.getItem("token");
  const storageExpirationTimestampSeconds = window.localStorage.getItem(
    "expirationTimestampSeconds"
  );
  if (storageToken && storageExpirationTimestampSeconds) {
    const nowTimeStampSeconds = Math.floor(Date.now() / 1000);
    const tokenIsNotExpired =
      storageExpirationTimestampSeconds - nowTimeStampSeconds > 0;
    if (tokenIsNotExpired) return storageToken;
  }
};
