export async function getLanguages() {
  const response = await fetch("http://localhost:3000/api/v1/combos/languages");
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const response = await fetch(
    "http://localhost:3000/api/v1/combos/categories"
  );
  const data = await response.json();
  return data;
}

export async function getSos() {
  const response = await fetch("http://localhost:3000/api/v1/combos/sos");
  const data = await response.json();
  return data;
}

export async function getPlayerModes() {
  const response = await fetch(
    "http://localhost:3000/api/v1/combos/player-modes"
  );
  const data = await response.json();
  return data;
}
