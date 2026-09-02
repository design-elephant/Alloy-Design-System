import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "../utils/cx";
import "./TextField.css";

export type TextFieldVariant = "outlined" | "filled";
export type TextFieldShape = "rounded" | "pill";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  variant?: TextFieldVariant;
  /** `pill` gives 999px ends — the house style for search fields. */
  shape?: TextFieldShape;
  /** Helper text shown below the field. Replaced by `error` when that is a string. */
  helperText?: ReactNode;
  /** `true` marks the field invalid; a string also replaces the helper text. */
  error?: boolean | string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  fullWidth?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      variant = "outlined",
      shape = "rounded",
      helperText,
      error,
      startAdornment,
      endAdornment,
      fullWidth = false,
      className,
      id,
      disabled,
      required,
      type,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const descId = `${fieldId}-desc`;
    const hasError = Boolean(error);
    const message = typeof error === "string" ? error : helperText;
    // search inputs default to the pill shape
    const resolvedShape = shape === "pill" || type === "search" ? "pill" : "rounded";

    return (
      <div
        className={cx(
          "alloy-field",
          `alloy-field--${variant}`,
          `alloy-field--${resolvedShape}`,
          hasError && "alloy-field--error",
          disabled && "alloy-field--disabled",
          fullWidth && "alloy-field--full",
          className,
        )}
      >
        {label && (
          <label className="alloy-field__label" htmlFor={fieldId}>
            {label}
            {required && <span className="alloy-field__required"> *</span>}
          </label>
        )}
        <div className="alloy-field__box">
          {startAdornment && (
            <span className="alloy-field__adornment">{startAdornment}</span>
          )}
          <input
            ref={ref}
            id={fieldId}
            type={type}
            className="alloy-field__input"
            aria-invalid={hasError || undefined}
            aria-describedby={message ? descId : undefined}
            disabled={disabled}
            required={required}
            {...rest}
          />
          {endAdornment && (
            <span className="alloy-field__adornment">{endAdornment}</span>
          )}
        </div>
        {message && (
          <p
            id={descId}
            className="alloy-field__message"
            role={hasError ? "alert" : undefined}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);
