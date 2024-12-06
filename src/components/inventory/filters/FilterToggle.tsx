interface FilterToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const FilterToggle = ({ label, checked, onChange }:FilterToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-4 w-4 text-indigo-600"
      />
      <label className="text-sm">{label}</label>
    </div>
  );
};

