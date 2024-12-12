import { Games } from "./ui.module.js";

export class Details {
  constructor(gameId) {
    this.games = new Games();
    document.querySelector(".btn-close").addEventListener("click", () => {
      document.querySelector(".games").classList.remove("d-none");
      document.querySelector(".details").classList.add("d-none");
    });
    this.getDetails(gameId);
  }
  async getDetails(gameId) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f870a4499emshe2fc8d94a2dd24cp1436e1jsnc37038b3106b",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => this.games.displayDetails(response))
      .catch((err) => console.error(err))
      .finally(() => {
        loading.classList.add("d-none");
      });
  }
}
