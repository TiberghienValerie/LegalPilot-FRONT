import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractApiService} from "./abstract-api.service";
import { Joueur } from '../models/joueur.model';

@Injectable({
  providedIn: 'root',
})
export class joueurApiService extends AbstractApiService<Joueur,Joueur>{


  constructor(
  httpClient: HttpClient
) {
  super(httpClient, 'joueurs');
}

}
