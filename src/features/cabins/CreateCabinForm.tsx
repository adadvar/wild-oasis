import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { Cabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }: { cabinToEdit?: Cabin | {} }) {
	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();

	const isWorking = isCreating || isEditing;
	//@ts-ignore
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);
	const { register, handleSubmit, reset, getValues, formState } = useForm<Cabin>(
		{
			defaultValues: isEditSession ? editValues : {},
		}
	);

	const { errors } = formState;

	const onSubmit: SubmitHandler<Cabin> = (data) => {
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			editCabin(
				//@ts-ignore
				{ newCabinData: { ...data, image }, id: editId },
				{ onSuccess: (data) => reset() }
			);
		else createCabin({ ...data, image }, { onSuccess: (data) => reset() });
	};
	//@ts-ignore
	const onError = (err: FieldErrors<Cabin>) => {};

	return (
		//@ts-ignore
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: { value: 1, message: "Capacity should be at least 1" },
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: { value: 1, message: "regularPrice should be at least 1" },
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isWorking}
					{...register("discount", {
						required: "This field is required",
						validate: (value: any) =>
							Number(value) <= Number(getValues().regularPrice)
								? true
								: `Discount:${value} should be less than regular price: ${
										getValues().regularPrice
								  }`,
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					id="description"
					defaultValue=""
					disabled={isWorking}
					{...register("description", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					type="file"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit cabin" : "Create new cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
