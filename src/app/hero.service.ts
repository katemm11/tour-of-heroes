import { Injectable } from "@angular/core";
import { Hero } from "./hero";

import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { MessageService } from "./message.service";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  //URL to web api
  private heroesUrl = "/api/heroes";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log("fetched heroes")),
      catchError(this.handleError<Hero[]>("getHeroes", []))
    );
  }

  //private error handling message
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      //send error to remote loggin infrastructure
      console.error(error);

      //transform error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`get hero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`update hero`))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`added new hero id=${hero.id}`)),
      catchError(this.handleError<Hero>(`added hero`))
    );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    const id = typeof hero === "number" ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${hero.id}`)),
      catchError(this.handleError<Hero>(`deleted hero`))
    );
  }
}
