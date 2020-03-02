import { Injectable } from "@angular/core";
import { Hero } from "./hero";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MessageService } from "./message.service";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  private heroesUrl = "/api/heroes";
  //URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add("HeroService: fetched heroes");
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero ${id}`);
    return this.getHeroes().pipe(
      map((heroes: Hero[]) => heroes.find(hero => hero.id === id))
    );
  }
}
