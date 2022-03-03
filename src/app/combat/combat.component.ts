import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Equipe } from '../models/equipe.model';
import { equipeApiService } from '../service/equipe-api.service';
import { CredentialsCombat } from './credentialsCombat';
import { CredentialsReponse } from './credentialsReponse';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css']
})
export class CombatComponent implements OnInit {

  public myForm!: FormGroup;

  createForm() {
    this.myForm = this.formBuilder.group({
         equipe2: ['',Validators.compose([Validators.required]) ],
         equipe1: ['',Validators.compose([Validators.required]) ]
    });
  }

  public texte!: string;

  public reponse!: string;

  public tabEquipes: Equipe[] = [];

  public apiURL = environment.apiURL;
  public apiConnexion = environment.apiConnexion;

  
  getEquipes(page: number = 1) {

    this.serviceApiEquipe.getCollection(page).subscribe(
      (data) => {
        
        for (let o of data['hydra:member']) {
          
          
            if(o.joueurs.length>0) {
              this.tabEquipes.push(
                new Equipe(o.id, o.nomEquipe, o.nbPartieGagne, o.nbPartiePerdue, o.nbPartieNull, o.couleur, o.joueurs)
              );
            }
          
        }
      },
      () => {
        alert('Cannot load Equipe');
      },
    );
  }


  constructor(public serviceApiEquipe: equipeApiService, private httpClient: HttpClient, private formBuilder: FormBuilder,) { 

    this.tabEquipes = [];
    this.getEquipes();
    this.createForm();
   
    this.texte = "";
    this.reponse = "";
  }

  ngOnInit(): void {}

  refresh() {
    this.tabEquipes = [];
    this.getEquipes();
    this.createForm();
   
    this.texte = "";
    this.reponse = "";
  }

  onSubmit() {

    //Traitement après vérification des cas de saisie
    if((this.myForm.controls['equipe1'].value == 0 && this.myForm.controls['equipe2'].value!=0) || (this.myForm.controls['equipe1'].value != 0 && this.myForm.controls['equipe2'].value==0) || (this.myForm.controls['equipe1'].value == 0 && this.myForm.controls['equipe2'].value==0)) this.texte="Vous devez choisir une équipe 1 et une équipe 2";
    else if(this.myForm.controls['equipe1'].value == this.myForm.controls['equipe2'].value) this.texte="Vous devez choisir 2 équipes différentes";
    else this.texte="";
    
    if(this.texte=='') {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      const body = JSON.stringify(this.myForm.value as CredentialsCombat);

      
      this.httpClient.post<CredentialsCombat>(`${this.apiConnexion}/joueur/combat`, body,httpOptions).subscribe(
        (data) => {
            this.reponse = data.messagegagnante;
        
        },
        (e: {error: {code: number, message: string}}) => {
          // When error.
          alert(e.error.message);
        },
      );
    }
      
  }

    


  

}
