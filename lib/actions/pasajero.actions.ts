"use server";

import { ID, Query, Databases } from "node-appwrite";
import { parseStringify } from "../utils";
import { users } from "../appwrite.config";

// Function to create a new user
export const createUser = async (user: { name: string; email: string; phone: string; }) => {
    try { 
        const newuser = await users.create( 
            ID.unique(),
            user.name,
            user.email,
            user.phone,
            undefined,
        );
        console.log("Usuario creado con éxito", newuser);
        return parseStringify(newuser);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("404")) {
                const documents = await users.list([
                    Query.equal("email", [user.email]),
                ]);
                return documents?.users[0];
            }
        }
        console.error("Error al crear usuario", error);
        throw new Error("No se pudo crear el usuario. Intente nuevamente.");

    }
}

// Function to create a reservation
export const createReservation = async (reservationData: { date: string; destination: string; userId: string; }) => {
    const databases = new Databases(); // Ensure databases is imported
    const DATABASE_ID = process.env.DATABASE_ID; // Use environment variable
    const PASAGERO_COLLECTION_ID = process.env.PASAGERO_COLLECTION_ID; // Use environment variable

    if (!DATABASE_ID || !PASAGERO_COLLECTION_ID) {
        console.error("Database ID or Collection ID is not defined.");
        return;
    }

    try {
        // Logic to create a reservation using Appwrite
        const reservation = await databases.createDocument(
            DATABASE_ID,
            PASAGERO_COLLECTION_ID,
            ID.unique(),
            reservationData
        );
        console.log("Reserva creada con éxito", reservation);
        return parseStringify(reservation);
    } catch (error) {
        console.error("Error al crear reserva", error);
        throw new Error("No se pudo crear la reserva. Intente nuevamente.");

    }
}
