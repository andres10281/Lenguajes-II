import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
        .max(100, "El nombre puede tener un máximo de 100 caracteres")
        .min(2, "El nombre debe tener al menos 2 caracteres"),
    
    email: z.string()
        .refine((email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email), "El correo no es válido"),
    
    phone: z.string()
        .min(10, "El teléfono debe tener al menos 10 caracteres")
        .max(15, "El teléfono debe tener como máximo 15 caracteres")
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "El teléfono debe tener el formato +1234567890")
        .optional(), // Allow phone to be optional

    
    date: z.coerce.date().optional(), // Ensure date is a Date type
    destination: z.string().nonempty("El destino es requerido"), // Make destination required


    
    tipoIdentificacion: z.enum(["cedula (CC)", "cedula de extrangeria (CE)", "pasaporte"]),
    
    numeroIdentificacion: z.string()
        .min(5, "Su identificación debe tener al menos 5 caracteres")
        .max(20, "Su identificación debe tener como máximo 20 caracteres"),
    
    direccion: z.string()
        .min(5, "La dirección debe tener al menos 5 caracteres")
        .max(500, "La dirección no puede tener más de 500 caracteres"),
    
    ciudadOrigen: z.enum(["Cali", "barranquilla", "cartagena", "medellin", "bogota"]),
    
    consentimientoTyC: z.boolean().default(false).refine(value => value === true, {
        message: "Debes aceptar los términos y condiciones"
    }),
    
    politicaProtecion: z.boolean().default(false).refine(value => value === true, {
        message: "Debes aceptar la política de protección de datos"
    }),
});

export const PasajeroFormValidation = z.object({
    name: z.string()
        .max(100, "El nombre puede tener un máximo de 100 caracteres").min(2, {
            message: "El nombre debe tener al menos 2 caracteres"
        }),
    tipoIdentificacion: z.enum(["cedula (CC)", "cedula de extrangeria (CE)", "pasaporte"]),
    
    numeroIdentificacion: z.string()
        .min(5, "Su identificación debe tener al menos 5 caracteres")
        .max(20, "Su identificación debe tener como máximo 20 caracteres"),
    
    email: z.string()
        .refine((email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email), "El correo no es válido"),
    
    phone: z.string()
        .min(10, "El teléfono debe tener al menos 10 caracteres")

        .refine((phone) => /^\+\d{10,15}$/.test(phone), "El teléfono debe tener el formato +1234567890"),
    
    birthDate: z.coerce.date(), // Ensure birthDate is a Date type
    fechaReserv: z.coerce.date(), // Ensure fechaReserv is a Date type


    
    gender: z.enum(["hombre", "mujer"]),
    
    direccion: z.string()
        .min(5, "La dirección debe tener al menos 5 caracteres")
        .max(500, "La dirección no puede tener más de 500 caracteres"),
    
    destino: z.enum(["Cali", "barranquilla", "cartagena", "medellin", "bogota"]),
    
    ciudadOrigen: z.enum(["Cali", "barranquilla", "cartagena", "medellin", "bogota"]),
    
    consentimientoTyC: z.boolean().default(false).refine(value => value === true, {
        message: "Debes aceptar los términos y condiciones"
    }),
    
    politicaProtecion: z.boolean().default(false).refine(value => value === true, {
        message: "Debes aceptar la política de protección de datos"
    }),
});
