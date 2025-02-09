declare type searchParamProps = {  
    params: {[key: string]: string };
    searchParam: {[key: string]: string | string [] | undefined };
};

declare type Gender = "Hombre" | "Mujer"  

declare interface createUserParams{
    name: string;
    email: string;
    phone: string;
}

declare interface User extends createUserParams{
    $id: string;
} 

declare interface RegisterUserParams extends createUserParams{
    tipoIdentificacion:FormData|undefined;
    numeroIdentificacion:string | undefined;
    birthDate: Date;
    fechaReserv: Date;
    gender: Gender;
    direccion:string; 
    destino: string;
    ciudadOrigen: string;
    consentimientoTyC: boolean;
    politicaProtecion: boolean;
}
