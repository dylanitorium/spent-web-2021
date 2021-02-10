import { InputHTMLAttributes } from "react";

interface FieldProps  {
  onChange: ({ name: string, value: any }) => any;
  name: string;
  label?: string;
  showLabel?: boolean;
  placeholder?: string;
}

const Field = ({ onChange, name, label, showLabel = false, ...props }: FieldProps) => (
  <div className="flex flex-col w-100 mb-6">
    {label && showLabel && <label htmlFor={name}>{label}</label>}
    <input
      name={name}
      className="h-12 w-100 px-4 transition-all rounded border-indigo-300 border placeholder-indigo-300 text-indigo-900 bg-indigo-100 focus:border-indigo-700 focus:ring-1 focus:ring-indigo-700  "
      onChange={(e) => onChange({ name, value: e.target.value })}
      {...props}
    />
  </div>
);

export default Field;
