import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { of, Observable } from "rxjs";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    this.messageService.add("HeroService: fetched heroes");
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero ${id}`);
    console.log("IN SERVICE ID IS ");
    console.log(id);
    const aHero = HEROES.filter(hero => hero.id === id);
    console.log(aHero);
    const thisHero = { id: 20, name: "Tornado" };

    return of(aHero[0]);
  }
}
