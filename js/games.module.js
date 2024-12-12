import { Games } from "./ui.module.js";
import { Details } from "./details.module.js";

export class GamesUi {
  constructor() {
    this.getAllGames("mmorpg");
    this.games = new Games();
    // console.log(this.showGameDetails());

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", (e) => {
        document.querySelector(".menu .active").classList.remove("active");
        e.target.classList.add("active");
        this.getAllGames(e.target.dataset.category);
      });
    });
  }
  async getAllGames(category) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f870a4499emshe2fc8d94a2dd24cp1436e1jsnc37038b3106b",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        this.games.displayGames(response);
        this.startEvent();
      })
      .finally(() => {
        loading.classList.add("d-none");
      });
  }
  startEvent() {
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.dataset.id;
        this.showGameDetails(id);
      });
    });
  }
  showGameDetails(id) {
    new Details(id);
    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
}
