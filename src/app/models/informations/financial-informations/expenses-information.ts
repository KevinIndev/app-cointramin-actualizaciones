export class ExpensesInformation {
    public  associate_id!: string;
    public  payments!: number;
    public  family_expenses!: number;
    public  personal_expenses!: number;
    public  financial_obligations!: number;
    public  other_expenses!: number;
    private total!: number;

    constructor(){
        this.Inicialzar();
    }

    private Inicialzar(){
        this.payments = 0;
        this.family_expenses = 0;
        this.personal_expenses = 0;
        this.financial_obligations = 0;
        this.other_expenses = 0;
        this.total = 0;
    }

    private CalculateTotal(): number{
        const suma_total = this.payments + this.family_expenses + this.personal_expenses + this.financial_obligations + this.other_expenses;
        return suma_total
    }

    public SetValue(parmas:ExpensesInformation){
        this.associate_id = parmas.associate_id;
        this.payments = parmas.payments;
        this.family_expenses = parmas.family_expenses;
        this.personal_expenses = parmas.personal_expenses;
        this.financial_obligations = parmas.financial_obligations;
        this.other_expenses = parmas.other_expenses;
        this.total = this.CalculateTotal();
    }

    public GetTotal(): number{
        return this.total;
    }
}
