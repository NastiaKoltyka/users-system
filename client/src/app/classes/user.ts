export class User {
    id:number;
    name:string;
    email:string;
    password:string;
    phone:string;
    date_of_birth:string;
    about_me:string;
    created_at:Date;
    updated_at:Date;
    roles:string[];

    constructor(name: string, email: string, password: string) {
        this.id = 0;
        this.email=email;
        this.name = name;
        this.password=password;
        this.phone='';
        this.date_of_birth='';
        this.about_me='';
        this.created_at= new Date;
        this.updated_at= new Date;
        this.roles=[];
    }
}