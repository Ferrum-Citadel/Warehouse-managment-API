import { useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

function Form() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    try {
      event.preventDefault();
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
      setValue('');
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
      <h1>Skroutz Last Mile assignment</h1>
      <h2>Vaoucher input</h2>
      <form onSubmit={handleSubmit}>
        {/* <input
          type="text"
          spellCheck="false"
          value={value}
          onChange={handleChange}
        /> */}
        <TextField
          variant="outlined"
          label="Voucher"
          size="small"
          type="text"
          spellCheck="False"
          value={value}
          onChange={handleChange}
        />
        {/* <button type="submit">Scan</button> */}
        <Button variant="outlined" type="submit" color="primary">
          Scan
        </Button>
        <p>{message}</p>
      </form>
    </>
  );
}

export default Form;
