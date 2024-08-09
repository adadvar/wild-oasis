import React, {
	cloneElement,
	createContext,
	useContext,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;
interface ModalContextProps {
	openName: string;
	open: (name: string) => void;
	close: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

const Modal = ({ children }: { children: React.ReactNode }) => {
	const [openName, setOpenName] = useState("");

	const open = (name: string) => setOpenName(name);
	const close = () => setOpenName("");

	return (
		<ModalContext.Provider value={{ openName, open, close }}>
			{children}
		</ModalContext.Provider>
	);
};

function Open({
	children,
	opens: openWindowName,
}: {
	children: React.ReactNode;
	opens: string;
}) {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error("Window must be used within a Modal");
	}

	const { open } = context;
	//@ts-ignore
	return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({
	children,
	name,
}: {
	children: React.ReactNode;
	name: string;
}) {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error("Window must be used within a Modal");
	}
	const { openName, close } = context;

	if (name !== openName) return null;

	return createPortal(
		<Overlay>
			<StyledModal>
				<Button onClick={close}>
					<HiXMark />
				</Button>
				{/* @ts-ignore */}
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
