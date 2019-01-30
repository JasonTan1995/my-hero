import { Injectable } from '@angular/core';
import {Hero} from '../app/heroes/hero';
import {HEROES} from '../app/heroes/mock.hero';
import {Observable, of} from 'rxjs';
import {MessageService} from '../app/message.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'http://localhost:8080/api/heroes';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add('HeroService: ${message}');
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError('geHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const getHeroUrl = `http://localhost:8080/api/getHero/${id}`;
    console.log(getHeroUrl);
    this.messageService.add(`HeroService fetched hero: ${id}`);
    return this.http.get<Hero>(getHeroUrl)
    .pipe(
      catchError(this.handleError<Hero>('getHero'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
   // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
