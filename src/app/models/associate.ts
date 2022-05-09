export class Associate {
        public createdAt!: Date
        public updatedAt!: Date
        public number_identity!: String
        public type_identity: any
        public names!: String
        public surname_1!: String
        public surname_2!: String
        public status!: String
        public update_data!: Date
        public createdBy: any
        constructor(){
            this.status_();
        }

        public status_(){
            this.status = 'Activo';
        }
}
