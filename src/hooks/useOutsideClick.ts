import { useEffect, useRef } from "react";

export const useOutsideClick = (
  handler: () => void,
  listenCapturing: boolean = true) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };
    document.addEventListener("click", handleClick, listenCapturing);
    return () => removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);
  return ref
}
