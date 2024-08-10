import styled from "styled-components";

interface StyledSelectProps {
	type: "white";
}

const StyledSelect = styled.select<StyledSelectProps>`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid
		${(props) =>
			props.type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)"};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`;
interface Option {
	value: string;
	label: string;
}

interface SelectProps {
	options: Option[];
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	[key: string]: any; // This allows for additional props to be passed in
}

const Select: React.FC<SelectProps> = ({
	options,
	value,
	onChange,
	...props
}) => {
	return (
		//@ts-ignore
		<StyledSelect value={value} onChange={onChange} {...props}>
			{options.map((option) => (
				<option value={option.value} key={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
};

export default Select;
