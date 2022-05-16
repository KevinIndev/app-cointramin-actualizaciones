import { OnChanges, SimpleChanges } from "@angular/core";

export class IncomesInformation {
    public associate_id!: string;
    public fixed_activity!: number;
    public business!: number;
    public pension!: number;
    public rents!: number;
    public others!: number;
    private total!: number;
    constructor(){
        this.Inicializar();
    }

    private Inicializar(){
        this.fixed_activity = 0;
        this.business = 0;
        this.pension = 0;
        this.rents = 0;
        this.others = 0;
        this.total = 0;
    }

    /**
     * Permite mapear o setear los ingresos al Object definido.
     * @param params Obtiene la informacion de los ingresos para su respectivo mapeado.
     */
    public SetValues(params:IncomesInformation){
        this.fixed_activity = params.fixed_activity;
        this.business = params.business;
        this.pension = params.pension;
        this.rents = params.rents;
        this.others = params.others;
        this.total = this.CalculateTotal();
    }

    /**
     * Calcula el total actual del Objecto IncomesInformations;
     * @returns El total calculado para el Object Inicializado.
     */
    private  CalculateTotal(): number{
        const suma = this.fixed_activity + this.business + this.pension + this.rents + this.others;
        this.total = suma;
        return this.total;
    }

    public GetTotal():number{
        return this.total;
    }
}
