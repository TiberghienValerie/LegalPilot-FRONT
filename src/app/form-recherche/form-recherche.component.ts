
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {environment} from "../../environments/environment";
import { JoueurComponent } from '../joueur/joueur.component';
import { Equipe } from '../models/equipe.model';
import { Joueur } from '../models/joueur.model';
import { equipeApiService } from '../service/equipe-api.service';
import { joueurApiService } from '../service/joueur-api.service';

@Component({
  selector: 'app-form-recherche',
  templateUrl: './form-recherche.component.html',
  styleUrls: ['./form-recherche.component.css']
})
export class FormRechercheComponent implements OnInit {

  public equipe!: number;
  public filtrer!: string;

  public tabEquipes: Equipe[] = [];
  public tabJoueursFilter: Joueur[] = [];
  public disabled: boolean = true;
  public url!: string;
  public nbPages!: number;

  public apiURL = environment.apiURL;
  public apiConnexion = environment.apiConnexion;

  @Input() public tabJoueurs!: Joueur[];
  @Input() public nbTotalEnregistrement!: number;
  @Input() public mode!: string;

  @Output() public rechercheFormulaire: EventEmitter<Joueur[]>;
  @Output() public rechercheFormulaireNbEnregistrement: EventEmitter<number>;
  @Output() public rechercheFormulaireUrl: EventEmitter<string>;
  @Output() public rechercheFormulaireMode: EventEmitter<string>;

  constructor(public serviceApiJoueur: joueurApiService, public serviceApiEquipe: equipeApiService) {

    this.rechercheFormulaire = new EventEmitter();
    this.rechercheFormulaireNbEnregistrement = new EventEmitter();
    this.rechercheFormulaireUrl = new EventEmitter();
    this.rechercheFormulaireMode = new EventEmitter();


    this.tabEquipes = [];

    
    
    this.getEquipes();
    this.equipe = 0;
    
   }

  ngOnInit(): void {
  }


  onSubmit() {
    this.mode = 'Recherche';
    this.tabJoueursFilter = [];

    this.serviceApiJoueur.getCollectionSearch(this.equipe).subscribe(
      
      (data) => {

        this.nbTotalEnregistrement = data['hydra:totalItems'];

        for (let o of data['hydra:member']) {

          this.tabJoueursFilter.push(
            new Joueur(
              o.id,
              o.nom,
              o.prenom,
              o.avatar,
              o.pointDefense,
              o.pointAttaque,
              o.pointEndurence,
              o.pointVitesse,
              o.nbVictoire,
              o.nbDefaite,
              new Equipe(o.equipe.id, o.equipe.nomEquipe, o.equipe.nbPartieGagne, o.equipe.nbPartiePerdue, o.equipe.nbPartieNull, o.equipe.couleur, o.equipe.joueurs)
            ));
        }

        this.rechercheFormulaire.emit(this.tabJoueursFilter);
        this.rechercheFormulaireNbEnregistrement.emit(this.nbTotalEnregistrement);



        this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*page=\s*/)[1]);

        this.url = (data['hydra:view']['hydra:last'].split(/\s*page=\s*/))[0]+'page=';


        this.rechercheFormulaireUrl.emit(this.url);
        this.rechercheFormulaireMode.emit(this.mode);
      });
  }


  getEquipes(page: number = 1) {



    this.serviceApiEquipe.getCollection(page).subscribe(
      (data) => {
        
        for (let o of data['hydra:member']) {
          this.tabEquipes.push(
            new Equipe(o.id, o.nomEquipe, o.nbPartieGagne, o.nbPartiePerdue, o.nbPartieNull, o.couleur, o.joueurs)
          );
        }
      },
      () => {
        alert('Cannot load Equipe');
      },
    );
  }

}
