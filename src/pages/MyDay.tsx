import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwSaxuN2z1BXIKdDFhBob28u8zsHcY5W77mJSpqIQp8qjVm1lO8pwp4MezvusmSqWZ9Sw/exec';

interface HealthForm {
  calories: string;
  steps: string;
  sleep: string;
  mood: string;
}

export default function MyDay() {
  const [form, setForm] = useState<HealthForm>({ calories: '', steps: '', sleep: '', mood: '' });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user_id = localStorage.getItem('user_id');
    const date = new Date().toISOString().split('T')[0];

    await fetch(SCRIPT_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ type: 'health', user_id, date, ...form }),
    });

    setForm({ calories: '', steps: '', sleep: '', mood: '' });
    setSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Мой день</h2>

        <label>
          Калории:
          <input
            type="number"
            name="calories"
            value={form.calories}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Шаги:
          <input
            type="number"
            name="steps"
            value={form.steps}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Сон (часы):
          <input
            type="number"
            name="sleep"
            value={form.sleep}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Настроение:
          <input
            type="text"
            name="mood"
            value={form.mood}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Сохранить</button>
      </form>

      {submitted && (
        <div style={{ marginTop: '1rem' }}>
          <p>Данные сохранены!</p>
          <Link to="/advice">
            <button>Посмотреть совет дня</button>
          </Link>
        </div>
      )}
    </div>
  );
}
