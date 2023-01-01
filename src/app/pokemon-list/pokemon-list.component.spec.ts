import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';

import { PokemonService } from '../services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let serviceSpy: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('PokemonService', ['getNext']);
    serviceSpy.getNext.and.returnValue(of({results: [{name: 'pokemon1'}], next: 'nextUrl'}));

    await TestBed.configureTestingModule({
      declarations: [ PokemonListComponent ],
      providers: [{provide: PokemonService, useValue: serviceSpy}],
      imports: [ MatCardModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show pokemon list', () => {
    component.pokemons = [{name: 'pokemon1', url: ''}]

    fixture.detectChanges();

    expect(fixture.debugElement).toBeTruthy();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Pokemon1');
  })
});
