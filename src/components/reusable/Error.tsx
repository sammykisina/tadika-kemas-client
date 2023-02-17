import type { FC } from "react";

interface ErrorProps {
  errorMessage?: string;
}

const Error: FC<ErrorProps> = ({ errorMessage }) => {
  return <span className="error">{errorMessage}</span>;
};

export default Error;
