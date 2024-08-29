import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

// type FormFields = {
//   email: string;
//   password: string;
// };

const HookForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@gmail.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <div className="parent">
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* using Zod */}
        <input
          {...register("email")}
          type="text"
          placeholder="Enter your Email"
        />
        {errors.email && <div className="error">{errors.email.message}</div>}
        {/* Without Zod */}
        <input
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 8,
              message: "Password must have 8 charachters",
            },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && <div className="error">{errors.root.message}</div>}
      </form>
    </div>
  );
};

export default HookForm;
