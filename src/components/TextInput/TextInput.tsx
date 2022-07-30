import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type TextInputProps = HTMLInputProps & {
  /**
   * Display label.
   */
  label?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  type = "text",
  ...props
}) => {
  const render = (): React.ReactElement => {
    return (
      <div>
        {renderLabel()}
        <div className="mt-1">
          <input
            type={type}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 block w-full sm:text-sm border-gray-300 rounded-md`}
            {...props}
          />
        </div>
      </div>
    );
  };

  const renderLabel = (): React.ReactNode => {
    if (label) {
      return (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      );
    }
  };

  return render();
};
