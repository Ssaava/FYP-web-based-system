import { useState } from "react";

export const usePasswordToggle = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const handlePasswordToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const inputType = isPasswordVisible ? "text" : "password";
  return { inputType, handlePasswordToggle };
};
export default usePasswordToggle;
