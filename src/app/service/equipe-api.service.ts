import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractApiService} from "./abstract-api.service";
import { Equipe } from '../models/equipe.model';

@Injectable({
  providedIn: 'root',
})
export class equipeApiService extends AbstractApiService<Equipe,Equipe>{


  constructor(
  httpClient: HttpClient
) {
  super(httpClient, 'equipes');
}

}
