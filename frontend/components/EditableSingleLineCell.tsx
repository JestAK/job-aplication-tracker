import React from 'react';
import { Input } from '@/components/ui/input';

export default function EditableSingleLineCell({
  value,
  onChange,
}: {
  value: string;
  onChange: (newValue: string) => void;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(inputValue);
  };

  return (
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}
