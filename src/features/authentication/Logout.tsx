import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
	const { logout, isLoading } = useLogout();

	return (
		//@ts-ignore
		<ButtonIcon disabled={isLoading} onClick={logout}>
			{!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
		</ButtonIcon>
	);
};

export default Logout;
