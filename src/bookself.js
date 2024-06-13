import React,{ useState }  from 'react'
import Bookcard from './bookcard'
import { Link } from 'react-router-dom'
const Bookself = () => {
    const in_my_bookself=JSON.parse(localStorage.getItem('My_bookself'))
    const [books,setBooks]=useState(typeof(in_my_bookself))
      
  return (
    <div>
      <center>
        <h1 className='font-bold text-2xl pb-5 pt-5'>
            Bookself
        </h1>
      </center>
      <span className='float-right text-2xl pr-20'>
     <button type="button" className="focus:outline-none text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><Link to="/">Back to Bookself</Link></button>
     

     </span>

      
        {
            in_my_bookself===null?(
                <div className='text-2xl'>
                    No books in the Bookself
                </div>
            ):
            (
              <span className='grid grid-cols-4 p-20' >
              {
              
                 in_my_bookself.map((bookname)=>(
                      <span className='p-5'>
                      <Bookcard bookname={bookname} index={in_my_bookself.indexOf(bookname)} key={in_my_bookself.indexOf(bookname)}  />
         
                    </span>
                   
               ))
                   
              
              }
              </span>
            )
        }
    
    </div>
  )
}

export default Bookself
