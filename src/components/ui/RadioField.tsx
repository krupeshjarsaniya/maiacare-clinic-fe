"use client";
import React from 'react';
import { InputFieldError, InputFieldLabel } from './InputField';

type Option = {
  label: string;
  value: string;
};

export const RadioButtonGroup = ({
  label = '',
  name = '',
  options = [],
  value = '',
  defaultValue = '',
  required = false,
  onChange = () => {},
  error = '',
  className = '',
  ...rest
}: {
  label?: string;
  name: string;
  options: Option[];
  value: string;
  defaultValue?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  [key: string]: unknown;
}) => {
  return (
    <div className={`maiacare-input-field-container ${className}`}>
      <InputFieldLabel label={label} required={required} />

      <div className="maiacare-radio-group">
        {options.map((option) => (
          <label key={option.value} className="maiacare-radio-wrapper">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value || defaultValue === option.value}
              onChange={onChange}
              required={required}
              {...rest}
            />
            <span className="maiacare-radio-custom"></span>
            <span className="maiacare-radio-label">{option.label}</span>
          </label>
        ))}
      </div>

      {error && (
        <InputFieldError error={error} />
      )}
    </div>
  );
};
