import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "../utils/cx";
import "./Selection.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  /** Visually indeterminate (tri-state). */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, indeterminate, className, id, disabled, ...rest }, ref) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <label
        className={cx(
          "alloy-choice",
          disabled && "alloy-choice--disabled",
          className,
        )}
        htmlFor={fieldId}
      >
        <span className="alloy-choice__control alloy-choice__control--box">
          <input
            ref={(node) => {
              if (node) node.indeterminate = Boolean(indeterminate);
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            id={fieldId}
            type="checkbox"
            className="alloy-choice__input alloy-focusable"
            disabled={disabled}
            {...rest}
          />
          <span className="alloy-state-layer" aria-hidden="true" />
          <svg className="alloy-choice__mark" viewBox="0 0 18 18" aria-hidden="true">
            <path
              className="alloy-choice__check"
              d="M4 9.5l3 3 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="alloy-choice__dash"
              d="M4 9h10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
            />
          </svg>
        </span>
        {label != null && <span className="alloy-choice__label">{label}</span>}
      </label>
    );
  },
);
