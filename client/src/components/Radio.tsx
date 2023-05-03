interface RadioProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<RadioProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className="inline-flex items-center mt-3">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-5 w-5 text-green-600 bg-white-dimmed"
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default Radio;
