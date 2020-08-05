const handleChange = (inputs, setInputs,cloneDeep) => {
    let event = window.event;
    const clonedInput = cloneDeep(inputs[event.target.name]);
    clonedInput.configs.value = event.target.value;
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [event.target.name]: clonedInput,
      };
    });
  };

  export {handleChange};