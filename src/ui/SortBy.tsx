import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface Option {
	value: string;
	label: string;
}

interface SortByProps {
	options: Option[];
}

const SortBy = ({ options }: SortByProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sortBy") || "";

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		searchParams.set("sortBy", e.target.value);
		setSearchParams(searchParams);
	};

	return (
		<Select
			options={options}
			type="white"
			value={sortBy}
			onChange={handleChange}
		/>
	);
};

export default SortBy;
