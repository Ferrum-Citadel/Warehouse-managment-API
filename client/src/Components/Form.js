import { useState } from 'react';

function Form() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit() {
    try {
      const response = fetch(`/scan/${value}`, { method: 'PUT' })
        .then((response) => response.json())
        .then((response) => {
          if (response.message) {
            setMessage(response.message);
          }
        });

      if (response.message) {
        setMessage(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    setValue(event.target.value);
    setMessage('');
  }

  return (
    <>
      <h1>Skroutz Last Mile assignement</h1>
      <h2>Vaoucher input</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          spellCheck="false"
          value={value}
          onChange={handleChange}
        />
        <button type="submit">Scan</button>
        <p>{message}</p>
      </form>
    </>
  );
}

export default Form;
