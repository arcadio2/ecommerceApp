export interface Sexo{
    id:number;
    sexo:string;
}
export class User {
    id!:number;
    username!:string;
    
    nombre!:string;
    apellido!:string;
    email!:string;
    password!:string
   /*  roles!:Role[] */
    roles!:string[];
}

export interface Role{
    id:number,
    nombre:string,
}
export interface DiaSemana{
    id:number; 
    dia:string;
}





export interface Perfil{
    id?:number; 
    usuario?:User;
    sexo?:Sexo;
    foto?:string; 
    edad?:number; 
    instructor?:string;
    peso?:number; 
    altura?:number; 
}