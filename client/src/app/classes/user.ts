export class User {
    id:number;
    name:string;
    email:string;
    password:string;
    created_at:Date;
    updated_at:Date;

    constructor(id: number, name: string, email: string, password: string,  created_at:Date,updated_at:Date) {
        this.id = id;
        this.email=email;
        this.name = name;
        this.password=password;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
}