import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "../utils/cx";
import "./Selection.css";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, id, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <label
      className={cx("alloy-choice", disabled && "alloy-choice--disabled", className)}
      htmlFor={fieldId}
    >
      <span className="alloy-choice__control alloy-choice__control--radio">
        <input
          ref={ref}
          id={fieldId}
          type="radio"
          className="alloy-choice__input alloy-focusable"
          disabled={disabled}
          {...rest}
        />
        <span className="alloy-state-layer" aria-hidden="true" />
        <span className="alloy-choice__dot" aria-hidden="true" />
      </span>
      {label != null && <span className="alloy-choice__label">{label}</span>}
    </label>
  );
});
