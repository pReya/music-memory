export const shuffleArray = (array) => {
  const clonedArray = JSON.parse(JSON.stringify(array));
  for (let i = clonedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
  }
  return clonedArray;
};

export const checkApiAuth = () =>
  new Promise((resolve, reject) => {
    const storageToken = window.localStorage.getItem("token");
    const storageExpirationTimestampSeconds = window.localStorage.getItem(
      "expirationTimestampSeconds"
    );
    const nowTimeStampSeconds = Math.floor(Date.now() / 1000);
    const tokenIsNotExpired =
      storageExpirationTimestampSeconds - nowTimeStampSeconds > 0;
    if (
      storageToken &&
      storageExpirationTimestampSeconds &&
      tokenIsNotExpired
    ) {
      resolve(storageToken);
    } else {
      reject();
    }
  });
