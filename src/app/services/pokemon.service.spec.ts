import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PokemonService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call pokemon api', () => {
    httpClientSpy.get.withArgs('https://pokeapi.co/api/v2/pokemon?limit=30').and.returnValue(of({}));
    service.getNext().subscribe(value => {
      expect(value).not.toBeNull();
    })
  })
});
