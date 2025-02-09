"use client";

import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "components/ui/form"; // Corrected import path

import { Input } from "components/ui/input"; // Corrected import path
import { Control } from "react-hook-form";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js/core";

export enum FormFieldTaype {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECK_BOX = "check_box",
    DATE_PICKER = "date_picker",
    SELECT = "select",
    SKELETON = "skeleton",
}

interface FormData {
    name: string,
    phone: string,
    email: string,
    date: string,
    destination: string,
    tipoIdentificacion: "cedula (CC)" | "cedula de extrangeria (CE)" | "pasaporte";
    numeroIdentificacion: string,
    direccion: string,
    ciudadOrigen: "Cali" | "barranquilla" | "cartagena" | "medellin" | "bogota";
    consentimientoTyC: boolean,
    politicaProtecion: boolean,
}

interface CustomProps {
    control: Control<FormData>,
    fieldtype: FormFieldTaype,
    name: keyof FormData, // Updated to ensure it matches FormData keys
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    dateFormat?: string,
    disabled?: boolean,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: FormData) => React.ReactNode,
    options?: { value: string; label: string }[], // Added options prop
}

const RenderField = ({ field, props }: { field: { value: string; onChange: (value: string) => void }; props: CustomProps }) => {
    const { fieldtype, placeholder, iconSrc, iconAlt, renderSkeleton } = props;
    if (fieldtype === FormFieldTaype.SKELETON && renderSkeleton) {
        return (renderSkeleton(field));
    }

    switch (props.fieldtype) {
        case FormFieldTaype.INPUT:
            return (
                <div className="flex rounded-md border bg-white-100">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            alt={iconAlt || "icon"}
                            width={24}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            value={field.value}
                            onChange={field.onChange}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldTaype.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry="CO"
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={(value) => field.onChange(value)}
                        className="input-phone"
                    />
                </FormControl>
            )
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldtype, name, label } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {fieldtype !== FormFieldTaype.CHECK_BOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField;
