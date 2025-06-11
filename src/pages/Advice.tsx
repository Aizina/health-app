import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwSaxuN2z1BXIKdDFhBob28u8zsHcY5W77mJSpqIQp8qjVm1lO8pwp4MezvusmSqWZ9Sw/exec';

interface AdviceResponse {
  advice: string;
}

export default function Advice() {
  const [advice, setAdvice] = useState<string>('');
  const navigate = useNavigate();

  const fetchAdvice = async () => {
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ type: 'advice' }),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        redirect: 'follow',
      });

      const data: AdviceResponse = await response.json();
      setAdvice(data.advice);

      const now = new Date();
      localStorage.setItem('daily_advice', data.advice);
      localStorage.setItem('advice_timestamp', now.toISOString());
    } catch (error) {
      setAdvice('Не удалось получить совет. Попробуйте позже.');
    }
  };

  useEffect(() => {
    const savedAdvice = localStorage.getItem('daily_advice');
    const savedTimestamp = localStorage.getItem('advice_timestamp');

    if (savedAdvice && savedTimestamp) {
      const savedTime = new Date(savedTimestamp);
      const now = new Date();
      const diffHours = (now.getTime() - savedTime.getTime()) / (1000 * 60 * 60);

      if (diffHours < 24) {
        setAdvice(savedAdvice);
        return;
      }
    }

    fetchAdvice();
  }, []);

  const handleNewAdvice = () => {
    fetchAdvice();
  };

  const goToMyDay = () => {
    navigate('/day');
  };

  return (
    <div>
      <h2>Совет дня</h2>
      <p>{advice}</p>
      <button onClick={handleNewAdvice}>Другой совет</button>
      <br />
      <button onClick={goToMyDay} style={{ marginTop: '1rem' }}>
        Внести данные в Мой день
      </button>
    </div>
  );
}
