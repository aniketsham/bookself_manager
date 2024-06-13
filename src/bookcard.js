import React from 'react'

const Bookcard = ({bookname,index}) => {

    const add_to_bookself=()=>{
        const booksinself=JSON.parse(localStorage.getItem("Books_in_Library"))
        booksinself[index].in_bookself=true       
        if(localStorage.hasOwnProperty("My_bookself")){
        const mySelf=JSON.parse(localStorage.getItem("My_bookself"))
        mySelf.push(booksinself[index])
        localStorage.setItem("My_bookself",JSON.stringify(mySelf))
        }
        else{
            const mySelf=[]
            mySelf.push(booksinself[index])
            localStorage.setItem("My_bookself",JSON.stringify(mySelf))
        }
        
        localStorage.setItem("Books_in_Library",JSON.stringify(booksinself))
        window.location.reload()
    }
   
  return (
   
    <div className='border border-black rounded-lg h-full w-full'>
        <div className='p-5'>
        <span className='grid grid-cols-2 '>
    <h2 className='font-bold'>Book Title:</h2>
    <p>{bookname.title}</p>
    </span>
      
    <span className='grid grid-cols-2 '>
    <h2 className='font-bold'>Edition Count:</h2>
      <p className='pb-20'>{bookname.edition_number}</p>
    </span>

    {
         bookname.in_bookself ? (
                <span className='pb-5'>
                    
                </span>
         ):(
            <center>
                <button type="button" className="relative top-0 bottom-0 h-min focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={add_to_bookself}>Add to Bookself</button>
       
        </center>
         )
    }
    
        </div>
   
      
    </div>
    
  )
}

export default Bookcard
