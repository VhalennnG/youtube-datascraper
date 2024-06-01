export function flattenAttributes(data: any): any {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data;
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Initialize an object with an index signature for the flattened structure
  let flattened: { [key: string]: any } = {};

  // Iterate over each key in the object
  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if (
      (key === "attributes" || key === "data") &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]));
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key]);
    }
  }

  return flattened;
}

export function extractYouTubeID(urlOrID: string): string | null {
  const regExpID = /^[a-zA-Z0-9_-]{11}$/;

  if (regExpID.test(urlOrID)) {
    return urlOrID;
  }

  const regExpStandard = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;

  const regExpShare = /youtu\.be\/([a-zA-Z0-9_-]{11})/;

  const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;

  const regExpShortShare = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;

  let match = urlOrID.match(regExpStandard);
  if (match) {
    return match[1];
  }

  match = urlOrID.match(regExpShare);
  if (match) {
    return match[1];
  }

  match = urlOrID.match(regExpShorts);
  if (match) {
    return match[1];
  }

  match = urlOrID.match(regExpShortShare);
  if (match) {
    return match[1];
  }

  return null;
}
