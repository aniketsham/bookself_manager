import { useState } from 'react'
import React, { useEffect } from 'react'
import Bookcard from './bookcard'
import { Link } from 'react-router-dom'

const Booksearch = () => {
  const [books,setBooks]=useState([])
  const [search,setSearch]=useState("")
  const [debouncedValue, setDebouncedValue] = useState(search);
  const LS=JSON.parse(localStorage.getItem('Books_in_Library'))
  const booksinbookself=[]

  const handleSearch = (event) => {
    setSearch(event.target.value);
};

    
    useEffect(() => {
      const handler = setTimeout(() => {
          setDebouncedValue(search);
      }, 500); 

      return () => {
          clearTimeout(handler);
      };
  }, [search]);

  useEffect(() => {


      if (debouncedValue) {
          console.log('Fetching data for:', debouncedValue);
          async function fetchBooks(){
            const url='https://openlibrary.org/search.json?q='+debouncedValue+'&limit=10&page=1.'
            let data1=await fetch(url)  
                  .then(response => {
                      if (!response.ok) {
                          throw new Error('Network response was not ok');
                      }
                      return response.json();
                  })
                  .then(data=>{
                    console.log(data)
                    data.docs.map((item)=>{
                      if(!localStorage.hasOwnProperty("My_bookself")){
                        booksinbookself.push({"title":item.title,"edition_number":item.edition_count,"in_bookself":false})
                        console.log("ok1")
                      }
                      else{
                        const in_bookself=JSON.parse(localStorage.getItem("My_bookself"))
                        if(in_bookself.some(book => book.title.toString() === item.title && book.edition_number === item.edition_count)){
                            booksinbookself.push({"title":item.title,"edition_number":item.edition_count,"in_bookself":true})
                            console.log("ok2")
                          }
                          else{
                            booksinbookself.push({"title":item.title,"edition_number":item.edition_count,"in_bookself":false})
                            
                          }
                        
                        
                      }
                     
                    })
                    setBooks(booksinbookself)
                  })
                  localStorage.setItem("Books_in_Library",JSON.stringify(booksinbookself))
          }
          fetchBooks()
          // Perform API call here, e.g., fetch(`https://api.example.com/search?query=${debouncedValue}`)
      }
  }, [debouncedValue]);

 
  return (
    <div className=''>
  
     <center>
      <form>
      <h1 className='font-bold text-2xl pb-5 pt-5' >Search by book name:</h1>
      <input type='text'  className='border border-black w-1/3' onChange={handleSearch}></input>
      </form>
      <br/>
     </center>
     
     <span className='float-right pr-20'>
     <button type="button" class="focus:outline-none text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><Link to="/mybookself">My Bookself</Link></button>
     </span>
     
     
     {
          localStorage.hasOwnProperty("Books_in_Library")?(
            search.length===0?(
              <span className='grid grid-cols-4 p-20' >
              {
                
                LS.map((bookname)=>(
                     <span className='p-5'>
                   <Bookcard bookname={bookname} index={LS.indexOf(bookname)} key={LS.indexOf(bookname)}  />
        
                  </span>
                  
                ))
                  }
             </span>
            ):(
              
              <span className='grid grid-cols-4 p-20' >
    {
      
      books.map((bookname)=>(
           <span className='p-5'>
           <Bookcard bookname={bookname} index={books.indexOf(bookname)} key={books.indexOf(bookname)}  />

         </span>
        
      ))
        }
   </span>
            )
          ):(
            <>
            Please search
            </>
          )
           
                
            
            
     }
     
    

     
      
    </div>
  )
}

export default Booksearch
