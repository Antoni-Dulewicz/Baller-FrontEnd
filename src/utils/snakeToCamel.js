export function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

export function transformKeysToCamelCase(obj) {
  const newObj = {};
  for (const key in obj) {
    const camelKey = toCamelCase(key);
    newObj[camelKey] = obj[key];
  }
  return newObj;
}
