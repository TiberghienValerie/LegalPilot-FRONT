import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Equipe } from '../models/equipe.model';
import { Joueur } from '../models/joueur.model';
import { joueurApiService } from '../service/joueur-api.service';

import * as Highcharts from 'highcharts';

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);



@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})

export class FicheComponent implements OnInit {

  public apiURL = environment.apiURL;
  public apiConnexion = environment.apiConnexion;

  idObj!: string;
 
  public tabJoueursId: Joueur[] = [];

  loading = true;

  public options: any;
  public options2: any;
 


  constructor(
    private route: ActivatedRoute,
    public serviceApiJoueur: joueurApiService) { }

    ngOnInit(): void {

      

      this.route.paramMap.subscribe((params) => {
        this.idObj = params.get('id')!;
      });
     
      this.serviceApiJoueur.getItem(parseInt(this.idObj)).subscribe(
        (data) => {
          this.tabJoueursId.push(
            new Joueur(
              data.id,
              data.nom,
              data.prenom,
              data.avatar,
              data.pointDefense,
              data.pointAttaque,
              data.pointEndurence,
              data.pointVitesse,
              data.nbVictoire,
              data.nbDefaite,
              new Equipe(data.equipe.id, data.equipe.nomEquipe, data.equipe.nbPartieGagne, data.equipe.nbPartiePerdue, data.equipe.nbPartieNull, data.equipe.couleur)
            ));
        
            this.options = {
              chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: true,
                  type: 'pie'
              },
              title: {
                  text: 'Statistique individuelle'
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              accessibility: {
                  point: {
                      valueSuffix: '%'
                  }
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: true,
                          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                      }
                  }
              },
              series: [{
                  name: 'Nombre de parties',
                  colorByPoint: true,
                  data: [{
                      name: 'Gagnée',
                      y: data.nbVictoire
                  }, {
                      name: 'Perdue',
                      y: data.nbDefaite
                  }]
              }]};


            this.options2 = {
              chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: true,
                  type: 'pie'
              },
              title: {
                  text: 'Statistique équipe'
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              accessibility: {
                  point: {
                      valueSuffix: '%'
                  }
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: true,
                          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                      }
                  }
              },
              series: [{
                  name: 'Parties',
                  colorByPoint: true,
                  data: [{
                      name: 'Gagnée',
                      y: data.equipe.nbPartieGagne
                  }, {
                      name: 'Perdue',
                      y: data.equipe.nbPartiePerdue
                  }, {
                      name: 'Null',
                      y: data.equipe.nbPartieNull
                  }]
              }]};
        
       

        
        
          Highcharts.chart('container', this.options);
          Highcharts.chart('container2', this.options2);
          this.loading = false;
        

      //
      });
       
  
    }

}
