import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext,
} = createFormHookContexts();

export const { useAppForm, useTypedAppFormContext } = createFormHook({
  formContext,
  fieldContext,
  formComponents: {},
  fieldComponents: {},
})