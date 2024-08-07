import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { Cabin, createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }: { cabinToEdit?: Cabin | {} }) {
	//@ts-ignore
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);
	const { register, handleSubmit, reset, getValues, formState } = useForm<Cabin>(
		{
			defaultValues: isEditSession ? editValues : {},
		}
	);

	const { errors } = formState;

	const queryClinet = useQueryClient();
	//@ts-ignore
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success("New Cabin successfully created");
			queryClinet.invalidateQueries({ queryKey: ["cabins"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	//@ts-ignore
	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		//@ts-ignore
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("New Cabin successfully edited");
			queryClinet.invalidateQueries({ queryKey: ["cabins"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	const isWorking = isCreating || isEditing;

	const onSubmit: SubmitHandler<Cabin> = (data) => {
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			//@ts-ignore
			editCabin({ newCabinData: { ...data, image }, id: editId });
		else createCabin({ ...data, image });
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
