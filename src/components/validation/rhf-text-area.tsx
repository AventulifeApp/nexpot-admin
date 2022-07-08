import React from 'react';
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { TextArea } from '~/components';
import { typedMemo } from '~/types/common';

type RHFTextInputProps<TFormValues> = {
  className?: string;
  name: Path<TFormValues>;
  labelProps: Omit<
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    'htmlFor'
  >;
  inputProps: Omit<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    'id' | 'name' | 'defaultValue'
  > & {
    defaultValue?: PathValue<TFormValues, Path<TFormValues>>;
    rules?: RegisterOptions<TFormValues>;
  };
  errorText?: string;
  helperText?: string;
  width?: string;
};

const RHFTextInput = <TFormValues extends FieldValues>({
  className,
  name,
  labelProps,
  inputProps: { defaultValue, rules, ...inputProps },
  helperText,
  errorText,
  width,
}: RHFTextInputProps<TFormValues>) => {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext<TFormValues>();
  React.useEffect(() => {
    if (name && defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <TextArea
      className={className}
      name={name}
      labelProps={labelProps}
      inputProps={{ ...register(name, rules), ...inputProps }}
      helperText={helperText}
      errorText={errorText || (errors?.[name]?.message as string)}
      width={width}
    />
  );
};

export default typedMemo(RHFTextInput);
