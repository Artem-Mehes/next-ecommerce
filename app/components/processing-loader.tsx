import { PropsWithChildren } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const ProcessingLoader = ({
  isLoading,
  children,
}: PropsWithChildren<{ isLoading?: boolean }>) =>
  isLoading ? (
    <span className="flex items-center justify-center gap-5">
      <AiOutlineLoading3Quarters className="animate-spin" />
      Processing... 👀
    </span>
  ) : (
    children
  );
