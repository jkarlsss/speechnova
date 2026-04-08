"use client";
import { formOptions } from "@tanstack/react-form";
import { z } from "zod";
import { useAppForm } from "../../../hooks/use-app-form";

const ttsFormSchema = z.object({
  text: z.string().min(1, "Text is required"),
  voiceId: z.string().min(1, "Voice is required"),
  temperature: z.number(),
  topP: z.number(),
  topK: z.number(),
  repetitionPenalty: z.number(),
});

export type TTSFormValues = z.infer<typeof ttsFormSchema>;

export const defaultTTSValues: TTSFormValues = {
  text: "",
  voiceId: "",
  temperature: 0.8,
  topP: 0.95,
  topK: 1000,
  repetitionPenalty: 1.2,
};

export const ttsFormOptions = formOptions({
  defaultValues: defaultTTSValues,
});



export function TextToSpeechForm({ children, defaultValues }: {
  children: React.ReactNode;
  defaultValues?: TTSFormValues;
}) {

  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

  return (
  <form.AppForm>
    {children}
  </form.AppForm>
  );
}
