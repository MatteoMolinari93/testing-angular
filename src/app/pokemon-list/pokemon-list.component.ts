import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  loading = false;
  pokemons: Pokemon[] = [];

  private subscription!: Subscription;

  constructor(public pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadMore();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadMore(): void {
    this.loading = true;
    this.subscription = this.pokemonService.getNext().subscribe({
      next: response => {
        this.pokemonService.next = response.next;
        this.pokemonService.pokemons.push(...response.results);
        this.pokemons = this.pokemonService.pokemons;
      },
      error: error => {
        console.log('Error Occurred:', error);
        this.loading = false
      },
      complete: () => this.loading = false
    });
  }

}
