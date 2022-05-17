export class PassivesInformation {
    public associate_id!: string;
    public debt!: string;
    public quantity!: number;
    public value_passive!: number;
    public entity_passive!: string;
    constructor(){
        this.Inicializar();
    }

    public Inicializar(){
        this.quantity = 0;
        this.value_passive = 0;
    }
}
