export const sandbox = async (asyncFn, onError = console.error) => {
  try {
    const res = await asyncFn();
    return res;
  } catch (err) {
    onError(err);
  }
};

export const unbox = (obj) => Object.entries(obj)[0];
