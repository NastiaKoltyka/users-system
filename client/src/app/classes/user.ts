export class User {
    id:number;
    name:string;
    email:string;
    password:string;
    created_at:Date;
    updated_at:Date;

    constructor(name: string, email: string, password: string) {
        this.id = 0;
        this.email=email;
        this.name = name;
        this.password=password;
        this.created_at= new Date;
        this.updated_at= new Date;
    }
}