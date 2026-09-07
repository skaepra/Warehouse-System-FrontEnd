import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type CommonProps = {
  icon?: React.ReactNode;
  error?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  className?: string;
};

type InputModeProps = CommonProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    multiline?: false;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

type TextAreaModeProps = CommonProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
    multiline: true;
    rows?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };

export type InputProps = InputModeProps | TextAreaModeProps;

export default function BaseInput(props: InputProps) {
  const {
    icon,
    error,
    rightElement,
    leftElement,
    multiline = false,
    className = "",
    onChange,
    ...rest
  } = props;

  const hasLeftContent = !!icon || !!leftElement;
  const hasRightContent = !!rightElement;

  // 💡 كلاسات مخصصة لمعالجة الخلفية البيضاء الخاصة بالـ Autofill
  const autofillClasses =
    "autofill:bg-transparent autofill:text-text [&&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s] [&&:-webkit-autofill]:[-webkit-text-fill-color:white]";

  return (
    <div className="my-2 flex flex-col w-full">
      <div
        className={`relative flex flex-row items-center bg-surface rounded-[22px] border transition-colors ${
          error ? "border-dangerRose" : "border-surface"
        } ${
          multiline ? "h-auto min-h-[45px] !items-start" : "h-[45px]"
        }`}
      >
        {icon && (
          <span
            className={`absolute left-[15px] flex items-center justify-center text-textMuted pointer-events-none ${
              multiline ? "top-[14px]" : ""
            }`}
          >
            {icon}
          </span>
        )}

        {leftElement && (
          <div
            className={`absolute left-[10px] z-10 flex items-center ${
              multiline ? "top-[12px]" : ""
            }`}
          >
            {leftElement}
          </div>
        )}

        {multiline ? (
          <textarea
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            onChange={
              onChange as React.ChangeEventHandler<HTMLTextAreaElement>
            }
            rows={(props as TextAreaModeProps).rows ?? 4}
            className={`flex-1 w-full bg-transparent text-text text-sm border-none outline-none focus:outline-none focus:ring-0 pt-3 pb-3 resize-y ${autofillClasses} ${
              hasLeftContent ? "pl-[45px]" : "pl-4"
            } ${hasRightContent ? "pr-[45px]" : "pr-4"} ${className}`}
          />
        ) : (
          <input
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            onChange={
              onChange as React.ChangeEventHandler<HTMLInputElement>
            }
            className={`flex-1 w-full h-full bg-transparent text-text text-sm border-none outline-none focus:outline-none focus:ring-0 ${autofillClasses} ${
              hasLeftContent ? "pl-[45px]" : "pl-4"
            } ${hasRightContent ? "pr-[45px]" : "pr-4"} ${className}`}
          />
        )}

        {rightElement && (
          <div
            className={`absolute right-[10px] flex items-center ${
              multiline ? "top-[12px]" : ""
            }`}
          >
            {rightElement}
          </div>
        )}
      </div>

      {!!error && (
        <span className="text-dangerRose text-xs mt-1 ml-[15px]">
          {error}
        </span>
      )}
    </div>
  );
}