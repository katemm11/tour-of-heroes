import { Injectable } from "@angular/core";
import { Hero } from "./hero";

import { of, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MessageService } from "./message.service";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  private heroesUrl = "/api/heros";
  //URL to web api

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private log(message: string) {
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
