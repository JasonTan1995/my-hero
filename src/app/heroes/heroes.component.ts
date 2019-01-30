import { Component, OnInit } from '@angular/core';
import {Hero} from '../heroes/hero';
import {HEROES} from '../heroes/mock.hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroSerivce: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroSerivce.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
