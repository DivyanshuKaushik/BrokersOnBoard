import Swal from 'sweetalert2'

export function DefaultError(){
    return (
        new Swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            timer: 2000,
            showConfirmButton: false,
        })
    )
}

export function OnError(err){
    return (
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
        })
    )
}

export function Success(){
    Swal.fire({
        icon: 'success',
        title: "Thank You",
        text:"We'll Get Back To You Soon"
    })
    return
}
