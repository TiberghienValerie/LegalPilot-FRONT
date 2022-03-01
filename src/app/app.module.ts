import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { JoueurComponent } from './joueur/joueur.component';
import { FormRechercheComponent } from './form-recherche/form-recherche.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FicheComponent } from './fiche/fiche.component';
import { CombatComponent } from './combat/combat.component';
import { HighchartsChartModule } from 'highcharts-angular';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    JoueurComponent,
    FormRechercheComponent,
    FicheComponent,
    CombatComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['localhost:8000'],
      },
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {}
}

