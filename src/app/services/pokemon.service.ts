import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Pokemon } from '../pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = environment.apiUrl + 'pokemon';
  private _pokemons: Pokemon[] = [];
  private _next: string = '';

  constructor(private http: HttpClient) { }

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }
  
  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  getNext(): Observable<any> {
    const url = this.next === '' ? `${this.url}?limit=30` : this.next;
    return this.http.get(url);
  }
  
}
