export function capitalizeFirstLetter(word: string = "") {
  if (!word) return "";

  return word[0].toLocaleUpperCase() + word.slice(1);
}
