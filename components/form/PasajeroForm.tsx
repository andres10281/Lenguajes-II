"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import CustomFormField, { FormFieldTaype } from "components/CustomFormField";
import Button from "components/ui/button"; // Corrected import statement
import SubmitButton from "components/SubmitButton";
import { PasajeroFormValidation } from "lib/validation";
import { createUser, createReservation } from "lib/actions/pasajero.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PasajeroForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Define your form.
  const form = useForm<z.infer<typeof PasajeroFormValidation>>({
    resolver: zodResolver(PasajeroFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: "", // Allow user to select a date
      fechaReserv: "", // Allow user to select a date
      date: "", // Allow user to select a date
      destination: "", // Allow user to select a destination



      consentimientoTyC: false,
      politicaProtecion: false,
    },
  });

  const { handleSubmit, reset, control, formState: { errors } } = form;

  const onSubmit = handleSubmit(async (values) => {
    setIsLoading(true);

    try {
      const userData = { 
        name: values.name, 
        email: values.email, 
        phone: values.phone,
        birthDate: values.birthDate,
        fechaReserv: values.fechaReserv,
        destino: values.destino,
        ciudadOrigen: values.ciudadOrigen,
        tipoIdentificacion: values.tipoIdentificacion,
        numeroIdentificacion: values.numeroIdentificacion,
        date: values.date, // Added required field
        destination: values.destination, // Added required field


        consentimientoTyC: values.consentimientoTyC,
        politicaProtecion: values.politicaProtecion,
      };

      const user = await createUser(userData);

      if (user) {
        const reservationData = { 
          date: values.fechaReserv.toISOString(), 
          destination: values.destino, 
          userId: user.$id 
        };
        await createReservation(reservationData);
        router.push(`/pasajero/${user.$id}/register`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-8 text-white-100">
        <section className="mb-12 text-white-200 space-y-4">
          <h1 className="harder text-white-100">VUELA CON NOSOSTROS 👋</h1>
          <p className="text-white-100">Reserva tu vuelo</p>
        </section>

        <CustomFormField
          fieldtype={FormFieldTaype.INPUT}
          control={control}
          name="name"
          label="Nombre Completo"
          placeholder="Ingrese su Nombre completo"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <CustomFormField
          fieldtype={FormFieldTaype.INPUT}
          control={control}
          name="email"
          label="Correo Electronico"
          placeholder="ejemplo@gmail.com"
          iconSrc="/assets/icons/gmail.svg"
          iconAlt="gmail"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <CustomFormField
          fieldtype={FormFieldTaype.PHONE_INPUT}
          control={control}
          name="phone"
          label="Numero de Telefono"
          placeholder="Ingrese su numero de telefono"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <CustomFormField
          fieldtype={FormFieldTaype.INPUT}
          control={control}
          name="fechaReserv"
          label="Fecha de Reserva"
          placeholder="Ingrese la fecha"
        />
        {errors.fechaReserv && <p className="text-red-500">{errors.fechaReserv.message}</p>}

        <CustomFormField
          fieldtype={FormFieldTaype.INPUT}
          control={control}
          name="destino"
          label="Destino"
          placeholder="Ingrese el destino"
        />
        {errors.destino && <p className="text-red-500">{errors.destino.message}</p>}

        <CustomFormField
          fieldtype={FormFieldTaype.SELECT}
          control={control}
          name="tipoIdentificacion"
          label="Tipo de Identificación"
          options={[
            { value: "cedula (CC)", label: "Cédula (CC)" },
            { value: "cedula de extrangeria (CE)", label: "Cédula de Extrangería (CE)" },
            { value: "pasaporte", label: "Pasaporte" },
          ]}
        />
        {errors.tipoIdentificacion && <p className="text-red-500">{errors.tipoIdentificacion.message}</p>}

        <CustomFormField
          fieldtype={FormFieldTaype.INPUT}
          control={control}
          name="numeroIdentificacion"
          label="Número de Identificación"
          placeholder="Ingrese el número de identificación"
        />
        {errors.numeroIdentificacion && <p className="text-red-500">{errors.numeroIdentificacion.message}</p>}

        <CustomFormField
          fieldtype={FormFieldTaype.INPUT}
          control={control}
          name="direccion"
          label="Dirección"
          placeholder="Ingrese su dirección"
        />
        {errors.direccion && <p className="text-red-500">{errors.direccion.message}</p>}

        <CustomFormField
          fieldtype={FormFieldTaype.SELECT}
          control={control}
          name="ciudadOrigen"
          label="Ciudad de Origen"
          options={[
            { value: "Cali", label: "Cali" },
            { value: "barranquilla", label: "Barranquilla" },
            { value: "cartagena", label: "Cartagena" },
            { value: "medellin", label: "Medellín" },
            { value: "bogota", label: "Bogotá" },
          ]}
        />
        {errors.ciudadOrigen && <p className="text-red-500">{errors.ciudadOrigen.message}</p>}

        <CustomFormField
          fieldtype={FormFieldTaype.CHECK_BOX}
          control={control}
          name="consentimientoTyC"
          label="Acepto los términos y condiciones"
        />
        {errors.consentimientoTyC && <p className="text-red-500">{errors.consentimientoTyC.message}</p>}

        <CustomFormField
          fieldtype={FormFieldTaype.CHECK_BOX}
          control={control}
          name="politicaProtecion"
          label="Acepto la política de protección de datos"
        />
        {errors.politicaProtecion && <p className="text-red-500">{errors.politicaProtecion.message}</p>}

        <SubmitButton isLoading={isLoading}>Registrar</SubmitButton>

        <Button
          type="button"
          onClick={() => reset()}
          className="ml-2 px-4 py-2 text-sm font-medium text-white-100 transition-all duration-300 bg-blue-900 border-2 border-white rounded-md shadow-md hover:bg-amber-600 hover:border-gray-200 hover:shadow-lg active:scale-95"
        >
          Reiniciar
        </Button>
      </form>
    </FormProvider>
  );
};

export default PasajeroForm;
