import { Tag } from "../Tag";

export const FormulaOutput = ({ selectedValues, removeSelectedValue }) => {
  return (
    <div>
      {selectedValues.map((value, index) => (
        <Tag
          value={value}
          removeSelectedValue={removeSelectedValue}
          key={`${value}-${index}`}
        />
      ))}
    </div>
  );
};
