export function capitalizeFirstLetter(word: string = "") {
  if (!word) return "";

  return word[0].toLocaleUpperCase() + word.slice(1);
}

export function removeTags(str: string) {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, "");
}

export function toKebabCase(str: string): string {
  return str

    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase(); // Convert the string to lowercase
}
