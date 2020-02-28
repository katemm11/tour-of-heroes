import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  hero: Hero = { id: 1, name: "Windstorm" };
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) {}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log(this.selectedHero);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe({
      next: heroes => (this.heroes = heroes),
      error: err => console.log(err)
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
