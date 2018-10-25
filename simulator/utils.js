export async function sleep(milliseconds) { // eslint-disable-line import/prefer-default-export
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function randomInRange(start, end) {
  return Math.random() * (end - start) + start;
}

export function randomIntInRange(start, end) {
  return Math.floor(randomInRange(start, end));
}
