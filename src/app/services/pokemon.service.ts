import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = environment.apiUrl + 'pokemon';
  private _pokemons: any[] = [];
  private _next: string = '';

  constructor(private http: HttpClient) { }

  get pokemons(): any[] {
    return this._pokemons;
  }
  
  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  get(name: string): Observable<object> {
    const url = `${this.url}${name}`;
    return this.http.get(url);
  }

  getNext(): Observable<object> {
    const url = this.next === '' ? `${this.url}?limit=30` : this.next;
    return this.http.get(url);
  }
  
}