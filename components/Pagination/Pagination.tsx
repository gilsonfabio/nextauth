import React, { useState, useEffect } from 'react';

interface pagesProps {
    pages?: number;
    setCurrentPage?: any;
    setNewPage?: any;
    pagInitial?: number;
}

const Pagination = ({pages, setCurrentPage, setNewPage, pagInitial}:pagesProps) => {
    const [pagesView, setPagesView] = useState(12);    
    const [cntPages , setCntPages] = useState(1);
    const [nroPage, setNroPage] = useState(1); 
    
    const totPages = pages as number;

    useEffect(() => {
        setCurrentPage(cntPages)     

    }, [cntPages, setCurrentPage, setNewPage, pages])

    useEffect(() => {
        setNroPage(1)
        setCntPages(1)    
        console.log('Pagina inicial:', pagInitial);
    }, [pagInitial])

    function handleNextPage() {        
        if(nroPage === totPages) {
            setNroPage(totPages)
        }else{ 
            setNroPage(nroPage + 1)
            setCntPages(cntPages + 1)   
        }         
        setNewPage(1);
    }
     
    function handlePreviusPage() {
        if(cntPages === 1) {
            setNroPage(1)
            setCntPages(1)
        }else{
            setNroPage(nroPage - 1)
            setCntPages(cntPages - 1)
        }        
    }

    return (
        <> 
            <button 
                className='w-auto hover:text-green-700'
                onClick={handlePreviusPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                    </svg>
            </button> 
            <div className='ml-2 md:ml-5 mr-5'>
                {cntPages}
            </div>
            <span>/</span>
            <div className='ml-1 mr-2'>
                {pages}
            </div>
            <button 
                className='w-auto hover:text-green-700'
                onClick={handleNextPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
            </button>            
        </>
    );
}

export default Pagination;
