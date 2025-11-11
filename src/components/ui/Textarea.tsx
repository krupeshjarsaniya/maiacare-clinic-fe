"use client";
import React from "react";
import {
  InputFieldError,
  InputFieldHelperText,
  InputFieldLabel,
} from "./InputField";
import { Form } from "react-bootstrap";

export default function Textarea({
  label,
  name,
  value,
  onChange,
  onBlur,
  required,
  disabled,
  readOnly,
  error,
  helperText,
  className,
  maxLength,
  ...rest
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  maxLength?: number;
  // [key: string]: any;
}) {
  return (
    <div className={`${className}`}>
      <InputFieldLabel label={label} required={required} />

      <Form.Control
        as="textarea"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        // required={required}
        disabled={disabled}
        readOnly={readOnly}
        className={`maiacare-input-field`}
        maxLength={maxLength}
        {...rest}
      />
      {maxLength && (
        <div className={`maiacare-input-field-maxlength-indicator d-flex align-items-center ${error ? 'justify-content-between' : 'justify-content-end'}`}>
          {error && <InputFieldError error={error} />}
          <p className="mb-0">
            {value.length}/{maxLength}
          </p>
        </div>
      )}
      {helperText && <InputFieldHelperText helperText={helperText} />}
    </div>
  );
}
