import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import {
  InputFieldLabel,
  InputFieldHelperText,
  InputFieldError,
} from "./InputField";

export const DatePickerFieldGroup = ({
  label = "",
  name,
  value,
  onChange = () => {},
  onBlur = () => {},
  onClick = () => {},
  placeholder = "",
  required = false,
  disabled = false,
  readOnly = false,
  error = "",
  helperText = "",
  className = "",
  iconColor,
  icon,
  ...rest
}: {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  iconColor?: string; // custom prop
  icon?: React.ReactNode;
  [key: string]: any;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.(); // Preferred if supported (modern browsers)
      inputRef.current.focus(); // Fallback for older support
    }
  };

  return (
    <div className={`maiacare-input-field-container ${className}`}>
      <InputFieldLabel label={label} required={required} />

      <div onClick={handleContainerClick} style={{ cursor: "pointer" }}>
        <Form.Control
          ref={inputRef}
          className="maiacare-input-field"
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          placeholder={placeholder}
          // required={required}
          disabled={disabled}
          readOnly={readOnly}
          {...rest}
        />
      </div>

      {error && <InputFieldError error={error} />}
      {helperText && <InputFieldHelperText helperText={helperText} />}
    </div>
  );
};
