import React from "react";
import Select from "react-select";

const SelectInput = ({ options, value, onChange }) => {
  const selectOptions = options.map((option) => ({
    value: option.id,
    label: option.name,
  }));

  return (
    <Select
      options={selectOptions}
      value={selectOptions.find((option) => option.value === value)}
      onChange={(selectedOption) => onChange(selectedOption.value)}
      placeholder="Select Your Country"
    />
  );
};

export default SelectInput;
