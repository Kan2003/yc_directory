"use client";

import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { FormsSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { createPitch } from "@/lib/action";
import { useRouter } from "next/navigation";
const StartupForm = () => {
  const [errors, SetError] = useState<Record<string, string>>({});
  const [pitch, SetPitch] = useState<string>();
  const { toast } = useToast();
  const router = useRouter();
  const handleFormSubmit = async (prevState: any, formdata: FormData) => {
    try {
      const formValue = {
        title: formdata.get("title"),
        description: formdata.get("description"),
        category: formdata.get("category"),
        link: formdata.get("link"),
        pitch,
      };

      await FormsSchema.parseAsync(formValue);

      const result = await createPitch(prevState, formdata , pitch as string)
      console.log(formValue);


      if(result.status == 'SUCCESS'){
        toast({
            title: 'Success',
            description: 'Your Startup Pitch has been Created !!',
        })
        router.push(`/startup/${result._id}`)
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.flatten().fieldErrors;

        SetError(fieldError as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your input and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "UnExpected ERROR",
        variant: "destructive",
      });
      return {
        ...prevState,
        error: "UnExpected ERROR",
        staus: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    errors: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech , Education etc...)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div data-color-mod="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => SetPitch(value)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Brefly decribe your idea & what problem you solved",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="startup-form_btn text-white"
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}{" "}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
