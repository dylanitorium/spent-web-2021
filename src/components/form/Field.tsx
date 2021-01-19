interface FieldProps  {
  onChange: ({ name: string, value: any }) => any;
  name: string;
  label?: string;
}

const Field = ({
  onChange,
  name,
  label,
  ...props
}: FieldProps) => (
  <div className="flex flex-col">
  {label && <label htmlFor={name}>{label}</label>}
  <input
    name={name}
    onChange={(e) => onChange({ name, value: e.target.value })}
    {...props}
  />
  </div>
);

export default Field;
