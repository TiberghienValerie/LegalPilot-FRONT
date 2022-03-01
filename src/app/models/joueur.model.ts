import { Equipe } from "./equipe.model";

export class Joueur {

    constructor(
        public id: number,
        public nom: string,
        public prenom: string,
        public avatar: string,
        public pointDefense: number,
        public pointAttaque: number,
        public pointVitesse: number,
        public pointEndurence: number,
        public nbVictoire: number,
        public nbDefaite: number,
        public equipe: Equipe,
      ) {}
}
