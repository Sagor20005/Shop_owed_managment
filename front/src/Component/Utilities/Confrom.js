import Swal from "sweetalert2"
const Confrom = (action,callback)=>{
  Swal.fire({
  title: "Are you sure?",
  text: `You won't be ${action} this!`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: `Yes, ${action} it!`
}).then((result) => {
  if (result.isConfirmed) {
    callback(true)
  }else{
    callback(false)
  }
});
}

export default Confrom;