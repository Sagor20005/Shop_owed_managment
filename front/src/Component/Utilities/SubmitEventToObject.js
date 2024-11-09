const FormFieldToObject = (e)=> {
  try {
    let formData = {}
    const feilds = Array.from(e.target.children)
    feilds.forEach((input)=> {
      if (input.tagName === "INPUT") {
          if ((input.name) === "amount" || input.name === "pises") {
            if(input.value > 0){
              formData[input.name] = Number(input.value)
            }
          } else {
            if(input.value.length > 0){
              formData[input.name] = input.value.trim()
            }
          }
      }
    })
    return formData
  }catch(err) {
    return {}
  }
}
export default FormFieldToObject;