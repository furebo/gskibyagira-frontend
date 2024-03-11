import { useState } from 'react'
import './StudentPagination.css'
function StudentsPagination(props){
    const[page,setpage]=useState(1);
    const[limit,setLimit]=useState(7);
    function gonext(){
        setpage(page + 1);
    }
    function goprevious(){
        setpage(page -1 );
    }
    return (
        <div className='studentspagination'>
        <ul className="pagination pagination-md justify-content-end" >
            <li className="page-item"><span className="page-link">&laquo;</span></li>
            <li className="page-item"><span className="page-link-prev" onClick={()=>goprevious()}>&lsaquo;</span></li>
            <li className="page-item"><span className="page-link-page">{page}</span></li>
            <li className="page-item"><span className="page-link-next" onClick={()=>gonext()}>&rsaquo;</span></li>
            <li className="page-item"><span className="page-link">&raquo;</span></li>
        </ul>
        </div>
    )
}
export default StudentsPagination