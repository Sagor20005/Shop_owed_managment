const TotalAmountCount = (array, isAll)=> {
  let finalAmount = 0;
  try {
    array.forEach((amountObj)=> {
      if(isAll){
        finalAmount += amountObj.amount
      }else{
        if(!amountObj.is_paid){
          finalAmount += amountObj.amount
        }
      }
      
    })
    return finalAmount;
  }catch(err) {
  return 0
}
}
export default TotalAmountCount;