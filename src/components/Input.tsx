import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>
        {label}
        <input {...props} style={{ display: 'block', width: '100%', padding: '6px' }} />
      </label>
    </div>
  );
}
