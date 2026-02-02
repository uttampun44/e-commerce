import '@testing-library/jest-dom/vitest';
import type { Assertion, AsymmetricMatchersContaining } from 'vitest';

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

interface CustomMatchers<R = void> {
  toBeInTheDocument(): R;
  toHaveTextContent(text: string | RegExp): R;
  toHaveAttribute(attr: string, value?: string): R;
  toBeVisible(): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toBeEmpty(): R;
  toBeInvalid(): R;
  toBeRequired(): R;
  toBeValid(): R;
  toContainElement(element: HTMLElement | null): R;
  toContainHTML(html: string): R;
  toHaveClass(className: string): R;
  toHaveFormValues(values: Record<string, any>): R;
  toHaveStyle(css: string | Record<string, any>): R;
  toHaveValue(value: string | number | string[]): R;
  toBePartiallyChecked(): R;
  toHaveErrorMessage(message: string): R;
}

