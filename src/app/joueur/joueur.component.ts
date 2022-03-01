import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from '../models/joueur.model';

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent implements OnInit {

  @Input() public unJoueur!: Joueur;
  constructor() { }

  ngOnInit(): void {
  }

}
