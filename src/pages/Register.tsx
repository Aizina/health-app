import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwSaxuN2z1BXIKdDFhBob28u8zsHcY5W77mJSpqIQp8qjVm1lO8pwp4MezvusmSqWZ9Sw/exec';

interface RegisterForm {
  name: string;
  age: string;
  weight: string;
  height: string;
  goal: string;
}

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessId(null);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        redirect: 'follow', 
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          type: 'register',
          name: form.name,
          age: form.age,
          weight: form.weight,
          height: form.height,
          goal: form.goal,
        }),
        mode: 'cors',
      });

      if (!response.ok) throw new Error(`Ошибка ${response.status}`);

      const result = await response.json();
      localStorage.setItem('user_id', result.id);
      setSuccessId(result.id);

      navigate('/day');
    } catch (err: any) {
      setError(err.message || 'Неизвестная ошибка');
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <label>
        Имя
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Возраст
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          required
          min={0}
        />
      </label>
      <br />
      <label>
        Вес (кг)
        <input
          type="number"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          required
          min={0}
        />
      </label>
      <br />
      <label>
        Рост (см)
        <input
          type="number"
          name="height"
          value={form.height}
          onChange={handleChange}
          required
          min={0}
        />
      </label>
      <br />
      <label>
        Цель
        <input name="goal" value={form.goal} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Отправка...' : 'Зарегистрироваться'}
      </button>

      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
      {successId && <p style={{ color: 'green' }}>Успешно зарегистрированы! ID: {successId}</p>}
    </form>
  );
}
