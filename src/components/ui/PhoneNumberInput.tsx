import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { InputFieldLabel, InputFieldHelperText, InputFieldError } from './InputField';

interface PhoneNumberInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  placeholder?: string;
  [key: string]: unknown;
}

export const PhoneNumberInput = ({
  label = '',
  value,
  onChange,
  required = false,
  error = '',
  helperText = '',
  className = '',
  placeholder = 'Enter your phone number',
  ...rest
}: PhoneNumberInputProps) => {
  return (
    <div className={`maiacare-input-field-container ${className}`}>
      <InputFieldLabel label={label} required={required} />

      <PhoneInput
        country={'in'}
        value={value}
        onChange={onChange}
        inputProps={{
          required: required,
          name: 'phone',
        }}
        inputClass="maiacare-phone-input "
        containerClass="maiacare-phone-input-container"
        buttonClass="maiacare-phone-button "
        placeholder={placeholder}
        enableSearch
        disableDropdown={false}
        {...rest}
      />

      {error && <InputFieldError error={error} />}
      {helperText && <InputFieldHelperText helperText={helperText} />}
    </div>
  );
};
