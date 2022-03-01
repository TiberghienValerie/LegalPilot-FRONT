export class Equipe {
    constructor(
        public id: number,
        public nomEquipe: string,
        public nbPartieGagne: number,
        public nbPartiePerdue: number,
        public nbPartieNull: number,
        public couleur: string,
      ) {}
}
