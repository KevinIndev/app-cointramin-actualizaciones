export class AssetsInformation {
    public associate_id!: string;
    public type_asset!: string;
    public description!: string;
    public commercial_value!: number;
    public isMortgage!: string;

    constructor(){
        this.Inicializar();
    }

    private Inicializar(){
        this.commercial_value = 0;
    }
}
