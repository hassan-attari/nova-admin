import { useField } from 'formik';
import type { InputHTMLAttributes } from 'react';
import { isDictionaryKey, useDictionary } from '../Dictionary/useDictionary';
import { ErrorText, Input, Select } from './ui';

import { Wrap, Textarea } from './FormField.styles';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  multiline?: boolean;
  options?: { value: string; label: string }[];
};

export function FormField({ name, label, multiline, options, ...props }: Props) {
  const { t } = useDictionary();
  const [field, meta] = useField<string>(name);
  const invalid = Boolean(meta.touched && meta.error);
  const error = meta.error && isDictionaryKey(meta.error) ? t(meta.error) : meta.error;
  const accessibility = {
    id: name,
    'aria-invalid': invalid,
    'aria-describedby': invalid ? `${name}-error` : undefined,
  };
  return (
    <Wrap>
      <label htmlFor={name}>{label}</label>
      {multiline ? (
        <Textarea
          {...field}
          {...accessibility}
          rows={5}
          maxLength={props.maxLength}
          disabled={props.disabled}
          placeholder={props.placeholder}
          dir={props.dir}
        />
      ) : options ? (
        <Select {...field} {...accessibility}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input {...props} {...field} {...accessibility} />
      )}
      {invalid && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </Wrap>
  );
}
