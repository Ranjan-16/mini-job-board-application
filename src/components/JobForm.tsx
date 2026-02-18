import { Button, TextField, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateJob } from "../hooks/useCreateJobs";
import AppSnackbar from "./Snackbar";

export default function JobForm(){

  const { mutate, isPending, isError } = useCreateJob();

  const [open,setOpen]=useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState:{ errors }
  } = useForm<any>();

  const onSubmit=(data:any)=>{
    mutate(data,{
      onSuccess:()=>{
        setOpen(true);
        reset();
      },
      onError:()=>{
        setOpen(true);
      }
    });
  };

  return(
    <>
      <Stack spacing={2}>
        <TextField
          label="Title"
          {...register("title",{ required:"Title is required" })}
          error={!!errors.title}
        
        helperText={errors.title?.message as string}
        />

        <TextField
          label="Description"
          {...register("description",{ required:"Description is required" })}
          error={!!errors.description}
        helperText={errors.description?.message as string}
          
        />

        <TextField
          type="number"
          label="Days Remaining"
          {...register("daysRemaining",{
            required:"No of days is required",
            valueAsNumber:true,
            validate:(v)=>v>0 || "Must be greater than 0"
          })}
          error={!!errors.daysRemaining}
        helperText={errors.daysRemaining?.message as string}
        />

        <Button
          variant="contained"
          disabled={isPending}  
          onClick={handleSubmit(onSubmit)}
        >
          {isPending ? "Creating..." : "Create Job"}
        </Button>
      </Stack>

      <AppSnackbar
        open={open}
        onClose={()=>setOpen(false)}
        message={isError ? "Error creating job" : "Job created"}
        severity={isError ? "error" : "success"}
      />
    </>
  );
}
