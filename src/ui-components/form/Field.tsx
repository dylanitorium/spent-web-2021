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
      className="h-12 w-100 px-4 rounded"
      onChange={(e) => onChange({ name, value: e.target.value })}
      {...props}
    />
  </div>
);

export default Field;
