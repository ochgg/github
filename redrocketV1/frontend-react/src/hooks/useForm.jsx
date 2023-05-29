import React, { useState } from 'react'

export const useForm = (initialObj = {}) => {

  const [form, setForm] = useState(initialObj);

  const handleChanged = ({target}) => {
   const {name, value} = target;

   setForm({
    ...form,
    [name]: value
   });
  }

  const resetForm = () => {
    setForm(initialObj);
  }
    
  return {
    form,
    handleChanged,
    resetForm
  };
    
  
}
