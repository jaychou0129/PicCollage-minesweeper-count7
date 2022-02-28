export const deepCopy = (mat) => {
  return mat.map(function (arr) {
    return arr.slice();
  });
};

export const calculateCount = (mat, target) => {
  let count = 0;
  for (let i = 0; i < mat.length; i++) {
    if (mat[i] === target) {
      count++;
      continue;
    }
    if (Array.isArray(mat[i])) {
      count += calculateCount(mat[i], target);
    }
  }
  return count;
};
