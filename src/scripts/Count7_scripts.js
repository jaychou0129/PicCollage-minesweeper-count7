export const inputValidator = (input) => {
  if (input === "") return "Input cannot be empty!";
  if (isNaN(parseInt(input))) return "Input has to be numerical!";
  if (parseInt(input) <= 0)
    return "Input has to be a positive integer (N > 0)!";
  if (parseInt(input) !== parseFloat(input))
    return "Input has to be an integer!";
  return "";
};

export const countNumbersWith7 = (n) => {
  // This function is adopted and modified from https://www.geeksforgeeks.org/count-numbers-from-1-to-n-that-have-4-as-a-a-digit/.
  // Base case
  if (n < 7) return 0;

  // d = (number of digits) - 1
  let d = Math.floor(Math.log10(n));

  // computing count of numbers from 1 to 10^d-1,
  // d=0 a[0] = 0;
  // d=1 a[1] = count of numbers from
  // 0 to 9 = 1
  // d=2 a[2] = count of numbers from
  // 0 to 99 = a[1]*9 + 10 = 19
  // d=3 a[3] = count of numbers from
  // 0 to 999 = a[2]*19 + 100 = 171
  let a = new Array(d + 2).fill(0);
  a[0] = 0;
  a[1] = 1;

  for (let i = 2; i <= d; i++)
    a[i] = a[i - 1] * 9 + Math.floor(Math.ceil(Math.pow(10, i - 1)));

  // Computing 10^d
  let p = Math.floor(Math.ceil(Math.pow(10, d)));

  // Most significant digit (msd) of n,
  // For 328, msd is 3 which can be obtained using 328/100
  let msd = Math.floor(n / p);

  // If MSD is 7. For example if n = 728, then count of
  // numbers is sum of following.
  // 1) Count of numbers from 1 to 699
  // 2) Count of numbers from 700 to 728 which is 29.
  if (msd === 7) return msd * a[d] + (n % p) + 1;

  // IF MSD > 7. For example if n
  // is 928, then count of numbers
  // is sum of following.
  // 1) Count of numbers from 1 to
  // 699 and count of numbers from
  // 800 to 899, i.e., "a[2] * 6"
  // 2) Count of numbers from 700
  // to 799, i.e. 100
  // 3) Count of numbers from 900 to
  // 928, recur for 28
  if (msd > 7) return (msd - 1) * a[d] + p + countNumbersWith7(n % p);

  // IF MSD < 7. For example if n is 328, then count of
  // numbers is sum of following.
  // 1) Count of numbers from 1 to 299 a
  // 2) Count of numbers from 300 to 328, recur for 28
  return msd * a[d] + countNumbersWith7(n % p);
};