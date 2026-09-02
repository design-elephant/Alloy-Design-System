import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "../utils/cx";
import "./Switch.css";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  /** Label placement relative to the track. */
  labelPosition?: "start" | "end";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, labelPosition = "end", className, id, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <label
      className={cx(
        "alloy-switch",
        `alloy-switch--label-${labelPosition}`,
        disabled && "alloy-switch--disabled",
        className,
      )}
      htmlFor={fieldId}
    >
      <span className="alloy-switch__track">
        <input
          ref={ref}
          id={fieldId}
          type="checkbox"
          role="switch"
          className="alloy-switch__input alloy-focusable"
          disabled={disabled}
          {...rest}
        />
        <span className="alloy-switch__thumb" aria-hidden="true">
          <span className="alloy-state-layer" />
        </span>
      </span>
      {label != null && <span className="alloy-switch__label">{label}</span>}
    </label>
  );
});
