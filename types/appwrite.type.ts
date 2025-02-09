import { Models } from "node-appwrite";

export interface Pasajero extends Models.Document {
    userID: string;
    nombre: string;
    email: string;
    phone: string;
    tipoIdentificacion: "cedula (CC)" | "cedula de extrangeria (CE)" | "pasaporte";
    numeroIdentificacion: string;
    birthDate: Date;
    fechaReserv: Date;
    gender: "hombre" | "mujer";
    direccion: string; 
    destino: string;
    ciudadOrigen: "Cali" | "barranquilla" | "cartagena" | "medellin" | "bogota";
    consentimientoTyC: boolean;
    politicaProtecion: boolean;
}
