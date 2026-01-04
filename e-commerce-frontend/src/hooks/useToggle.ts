import { useCallback, useState } from "react";

/**
 * hooks start with 'use'
 * A custom hook to manage a boolean toggle state.
 * @param initialValue - The initial value of the toggle (default is false).
 * @returns A tuple containing the current value and a function to toggle it.
 * @example
 * 
 * pass the code snippet like this in your component
 * const [isToggled, toggle] = useToggle();
 * // isToggled is false initially
 */

export default function useToggle(initialValue: boolean = false) {

  const [value, setValue] = useState<boolean>(initialValue);
  
  const toggle = useCallback(() => { setValue((prev) => !prev);}, []);
    
  return [value,  toggle] as const;
}