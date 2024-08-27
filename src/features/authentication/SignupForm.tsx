import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { User } from "@supabase/supabase-js";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
	const { signup, isLoading } = useSignup();
	const { register, formState, getValues, handleSubmit, reset } =
		useForm<User>();
	const { errors } = formState;

	//@ts-ignore
	const onSubmit: SubmitHandler<User> = ({ fullName, email, password }) => {
		signup(
			{
				fullName,
				email,
				password,
			},
			{
				onSettled: () => reset(),
			}
		);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			{/* @ts-ignore */}
			<FormRow label="Full name" error={errors?.fullName?.message}>
				{/* @ts-ignore */}
				<Input
					type="text"
					id="fullName"
					disabled={isLoading}
					// @ts-ignore
					{...register("fullName", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					type="email"
					id="email"
					disabled={isLoading}
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Please provide a valid email address",
						},
					})}
				/>
			</FormRow>
			<FormRow
				label="Password (min 8 characters)"
				// @ts-ignore
				error={errors?.password?.message}
			>
				{/* @ts-ignore */}
				<Input
					type="password"
					id="password"
					disabled={isLoading}
					// @ts-ignore

					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters",
						},
					})}
				/>
			</FormRow>
			{/* @ts-ignore */}
			<FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
				<Input
					type="password"
					id="passwordConfirm"
					disabled={isLoading}
					// @ts-ignore
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (value) =>
							// @ts-ignore
							value === getValues().password || "Password neet to match",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					disabled={isLoading}
					// @ts-ignore
					onClick={reset}
				>
					Cancel
				</Button>
				<Button disabled={isLoading}>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
