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
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster position="top-right" />
      <form
        action={formAction}
        className="flex flex-col gap-4 w-full max-w-md p-6"
      >
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nom"
            required
            className="p-2 border rounded-md w-full"
          />
          {state.name.errors && (
            <p className="text-red-500 text-sm">
              {state.name.errors.join(", ")}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="p-2 border rounded-md w-full"
          />
          {state.email.errors && (
            <p className="text-red-500 text-sm">
              {state.email.errors.join(", ")}
            </p>
          )}
        </div>

        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Votre message"
            required
            className="p-2 border rounded-md w-full min-h-[150px]"
          />
          {state.message.errors && (
            <p className="text-red-500 text-sm">
              {state.message.errors.join(", ")}
            </p>
          )}
        </div>

        <button
          className="bg-gray-300 rounded-md p-2 hover:bg-gray-400 transition-colors disabled:opacity-50"
          disabled={!isValid || isPending}
        >
          {isPending ? "Envoi..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
