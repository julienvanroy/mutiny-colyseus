const diffArray = (arr1, arr2) => arr1.filter((x) => !arr2.includes(x));

export default diffArray;
