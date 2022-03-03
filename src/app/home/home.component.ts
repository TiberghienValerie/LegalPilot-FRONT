import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Equipe } from '../models/equipe.model';
import { Joueur } from '../models/joueur.model';
import { joueurApiService } from '../service/joueur-api.service';
import {Collection} from "../models/collection";
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public tabJoueurs: Joueur[] = [];
 
  public tabtabEquipes: Equipe[] = [];
  
  public tabJoueursFilter: Joueur[] = [];

  
  public nbTotalEnregistrement!: number;
  public nbPages!: number;
  public url!: string;
  public resultatParPage!: number;
  public mode!: string;
  public apiURL = environment.apiURL;
  public apiConnexion = environment.apiConnexion;
 

  constructor(
    private httpClient: HttpClient,
    public serviceApiJoueur: joueurApiService,
    
  ) {

    
    this.tabJoueurs = [];
    this.tabJoueursFilter = [];
    this.getJoueurs();
    
    this.resultatParPage = 30;
    this.mode = 'nonRecherche';
  }

  ngOnInit(): void {

  }



  

  getJoueurs(page: number = 1)
  {
   
    this.serviceApiJoueur.getCollection().subscribe(
      (data) => {

        for (let o of data['hydra:member']) {
          
            this.tabJoueurs.push(
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


        this.tabJoueursFilter.push(...this.tabJoueurs);

        this.nbTotalEnregistrement = data['hydra:totalItems'];
        this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*=\s*/)[1]);
        this.url = (data['hydra:view']['hydra:last'].split(/\s*=\s*/))[0]+'=';
      }


      );
  }

  rechercheFormulaireNbEnregistrement(nbTotalEnregistrement: number) {
    this.nbTotalEnregistrement = nbTotalEnregistrement;
  }

  rechercheFormulaireUrl(url: string) {
    this.url = url;
  }

  rechercheFormulaireMode(mode: string) {
    this.mode = mode;
  }

  rechercheFormulaire(tabJoueur: Joueur[]) {
    this.tabJoueursFilter.length = 0;
    this.tabJoueursFilter.push(...tabJoueur);

    this.ngOnInit();
  }

  onSubmit() {}


  pageChanged(event: PageChangedEvent, url: string, mode: string): void {

    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    url = url + event.page;
    this.mode = mode;
    this.tabJoueurs = [];
    this.tabJoueursFilter = [];
    this.serviceApiJoueur.getCollectionSpecifique(`${this.apiConnexion}${url}`).subscribe(
        (data) => {
          for (let o of data['hydra:member']) {
          
            this.tabJoueurs.push(
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

          this.tabJoueursFilter.push(...this.tabJoueurs);

          this.nbTotalEnregistrement = data['hydra:totalItems'];



          if(this.mode=='nonRecherche') {
            this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*=\s*/)[1]);
            this.url = (data['hydra:view']['hydra:last'].split(/\s*=\s*/))[0]+'=';
          }else{
            this.nbPages = parseInt(data['hydra:view']['hydra:last'].split(/\s*page=\s*/)[1]);
            this.url = (data['hydra:view']['hydra:last'].split(/\s*page=\s*/))[0]+'page=';
          }
        });
  }


}
