import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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