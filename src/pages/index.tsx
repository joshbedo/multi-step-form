import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' });

  const onSubmit = (data: any) => console.log(data, 'form data');

  type InputProps = {
    label: string;
    required: boolean;
    type: string;
    placeholder: string;
  };
  
  const Input = ({
    label,
    required,
    type,
    placeholder,
  }: InputProps) => {
    return (
      <div>
        <label>{label}</label>
        <input 
          {...register(label, { required })}
          className={errors[label] && 'border-red'}
          type={type}
          placeholder={placeholder} />
          {errors[label] && <span>mandatory</span>}
      </div>
    );
  };

  const PersonFields = () => (
    <section>
      <h1>Personal Information</h1>
      <Input label="Full Name" required type="text" placeholder="Josh" />
      <Input label="Birthday" required type="date" placeholder="Pick a date" />
    </section>
  );

  const ContactFields = () => (
    <section>
      <h1>Personal Information</h1>
      <Input label="Test Name" required type="text" placeholder="Josh" />
    </section>
  );
  
  const Navigation = () => (
    <section>
      {step === fieldGroups.length-1 && 
        <button type="submit" disabled={!isValid}>Save</button>
      }
      {step < fieldGroups.length-1 && 
        <button type="button" onClick={() => { setStep(step+1) }} disabled={!isValid}>Next</button>
      }
      {step > fieldGroups.length-1 && 
        <button type="button" onClick={() => { setStep(step-1) }} disabled={!isValid}>Back</button> 
      }
    </section>
  )

  const [step, setStep] = useState(0)
  const fieldGroups = [
    <PersonFields />,
    <ContactFields />,
  ];
  
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>User Register</h2>
          {fieldGroups[step]}
          <Navigation />
          {/* <Reference /> */}
        </form>
      </div>
    </>
  );
};

export default Home;
