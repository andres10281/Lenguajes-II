import PasajeroForm from "components/form/PasajeroForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
            src="/assets/icons/logo.png"
            height={1000}
            width={1000}
            alt="Logo Principal"
            className="mb-12 h-24 w-fit"
          />
          <PasajeroForm />

          <div className="text-18-semibold text-white-100 mt-20 flex justify-between">
            <p> © 2025 AEROLINEA FLY CB </p>
            <Link 
              href="/admin?admin=true"  
              className="text-18-semibold text-white-100"
            >
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/image/tripulacion.png"  
        height={1000}
        width={1000}
        alt="portada"
        className="side-image max-w-[50%]"
      />
    </div>
  );
}
