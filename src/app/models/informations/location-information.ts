export class LocationInformation {
    public associate_id!: string;
    public residence_adress!: string;
    public country!: string;
    public department!: string;
    public city!: string;
    public number_phone!: string;
    public number_tel!: string;
    public type_housing!: string;
    public email!: string;
    public adress_work!: {
        type: string;
        defaultValue: '---';
    };
    public country_work!: {
        type: string;
        defaultValue: 'COLOMBIA';
    };
    public department_work!: string;
    public city_work!: string;
    public number_phone_work!: string;

    constructor(){
    }
}
