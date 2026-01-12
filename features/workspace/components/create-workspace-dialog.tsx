"use client"

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Plus } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
const createWorkspaceSchema = z.object({
  name: z.string().min(1, {
    error: "Name shouldn't be empty",
  }),
});
const CreateWorkspaceDialog = () => {
  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: createWorkspaceSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="cursor-pointer py-5      border-dashed self-center"
        >
          <Plus className="size-4" />
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Create Workspace</CredenzaTitle>
          <CredenzaDescription>
            Create a new workspace to get started
          </CredenzaDescription>
        </CredenzaHeader>

        <CredenzaBody>
          <form
            id="create-workspace-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Name
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="My workspace..."
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CredenzaBody>

        <CredenzaFooter>
          <Button type="submit" form="create-workspace-form">
            Create
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default CreateWorkspaceDialog;
