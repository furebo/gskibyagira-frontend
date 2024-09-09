import { toast } from 'react-toastify';
export const notify = (message) =>{ toast.success(message,
    {
        style: { 
            background: 'green',
            color:'white',
            width:'500px',
            marginRight:'100px',
            marginTop:'50px',
        
         }
    })   
}