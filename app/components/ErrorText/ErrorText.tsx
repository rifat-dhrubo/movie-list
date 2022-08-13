import React from "react";

const ErrorText = ({ text }: { text: string }) => {
  return <p className="mt-1 text-red-500 text-body-2">{text}</p>;
};

export default ErrorText;
