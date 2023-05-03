interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxProps(props: CheckboxProps) {
  return (
    <label className="inline-flex items-center mt-3">
      <input
        type="checkbox"
        name={props.name}
        checked={props.checked}
        onChange={props.onChange}
        className="form-checkbox h-5 w-5 text-green-600"
      />
      <span className="ml-2 text-gray-700">{props.label}</span>
    </label>
  );
}
