import React from 'react';
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { PullDown } from '~/components';
import { typedMemo } from '~/types/common';

type RHFPullDownProps<TFormValues> = {
  className?: string;
  name: Path<TFormValues>;
  labelProps: Omit<
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    'htmlFor'
  >;
  selectProps: Omit<
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    'id' | 'name'
  > & {
    defaultValue?: PathValue<TFormValues, Path<TFormValues>>;
    rules?: RegisterOptions<TFormValues>;
  };
  errorText?: string;
  helperText?: string;
  options: React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >[];
};

const RHFPullDown = <TFormValues extends FieldValues>({
  className,
  name,
  labelProps,
  selectProps: { defaultValue, rules, ...inputProps },
  helperText,
  errorText,
  options,
}: RHFPullDownProps<TFormValues>) => {
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
    <PullDown
      className={className}
      name={name}
      labelProps={labelProps}
      selectProps={{ ...register(name, rules), ...inputProps }}
      helperText={helperText}
      errorText={errorText || (errors?.[name]?.message as string)}
      options={options}
    />
  );
};

export default typedMemo(RHFPullDown);
