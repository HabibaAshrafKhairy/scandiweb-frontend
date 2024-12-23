export function capitalizeFirstLetter(word: string = "") {
  if (!word) return "";

  return word[0].toLocaleUpperCase() + word.slice(1);
}

export function removeTags(str: string) {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, "");
}
