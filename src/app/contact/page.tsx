"use client";

import { useActionState } from "react";
import { createMessage } from "@/lib/action";
import { toast, Toaster } from "sonner";
import { useState, useEffect } from "react";

export type ContactFormState = {
  name: { value: string; errors?: string[] };
  email: { value: string; errors?: string[] };
  message: { value: string; errors?: string[] };
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isValid, setIsValid] = useState(false);

  const [state, formAction, isPending] = useActionState<
    ContactFormState,
    FormData
  >(
    async (prevState, formData) => {
      const result = await createMessage(prevState, formData);
      if (result && typeof result === "object") {
        const hasErrors = (
          Object.values(result) as { errors?: string[] }[]
        ).some((field) => field?.errors && field.errors.length > 0);

        if (!hasErrors) {
          toast.success("Message envoyé avec succès!");
          setFormData({ name: "", email: "", message: "" });
        }
      }
      return result;
    },
    {
      name: { value: "" },
      email: { value: "" },
      message: { value: "" },
    }
  );

  useEffect(() => {
    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsValid(isFormValid);
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-full lg:h-screen flex flex-col-reverse lg:flex-row mt-24 lg:mt-32 px-6 md:px-12">
      <Toaster position="top-right" />
      <div className="flex flex-col">
        <h1 className="text-7xl md:text-9xl mb-12">Contact</h1>
        <form
          action={formAction}
          className="flex flex-col gap-4 md:min-w-[600px]"
        >
          <div className="md:flex w-full gap-4 mb-6">
            <div className="w-full">
              <label htmlFor="name" className="pb-2 block">
                Nom
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nom"
                required
                className="mb-4 md:mb-0"
              />
              {state.name.errors && (
                <p className="text-red-500 text-sm">
                  {state.name.errors.join(", ")}
                </p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="email" className="pb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              {state.email.errors && (
                <p className="text-red-500 text-sm">
                  {state.email.errors.join(", ")}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="pb-2 block">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Votre message"
              required
              className="py-3 px-5 rounded-lg w-full min-h-[150px]"
            />
            {state.message.errors && (
              <p className="text-red-500 text-sm">
                {state.message.errors.join(", ")}
              </p>
            )}
          </div>

          <button
            className="py-3 px-5 rounded-lg bg-black text-white disabled:opacity-50 hover:bg-transparent hover:border-white border border-black transition-all"
            disabled={!isValid || isPending}
          >
            {isPending ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </div>
      <div className="lg:mt-48 lg:pl-6 xl:pl-40 mb-12 lg:mb-0">
        <p className="text-xl">
          <span className="italic font-normal">Arthur Agency</span> est une
          agence web créative qui transforme les idées en expériences digitales
          uniques. Nous concevons des sites web innovants, esthétiques et
          intuitifs, alliant design percutant et performance optimale. Que vous
          soyez une startup ou une marque établie, nous donnons vie à votre
          vision avec passion et expertise. <br />
          <span className="underline-offset-4 underline font-normal">
            Créons ensemble quelque chose d’extraordinaire.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
