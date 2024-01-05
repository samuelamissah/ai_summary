import React from 'react'
import { useState, useEffect } from 'react'
import {copy, linkIcon, loader, tick} from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'
const Demo = () => {
    const [article, setArticle] = useState({
        summary: '',
        url: '',
    });

    const handleSubmit = () => {
        alert('submit')
    }


  return (
    <section className='mt-q7 w-full max-w-xl'>
        {/* Search */}
        <div className='w-full flex  mb-10 flex-col gap-2'>
          <form
            className='relative flex mt-5'
            placeholder='Search for an article'
            onSubmit={handleSubmit}
          >
         <img src={linkIcon} alt="link icon" className="absolute my-3 ml-3 w-5"/>   

            <input
                type='url'
                value={article.url}
                className=' url_input peer' 
                placeholder='Paste article'
                required
                onChange={(e) => setArticle({ ...article, url: e.target.value })}
            /> 
        <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
        ↵
        </button>


          </form>
          {/* History */}


        </div>
        {/* Result */}

    </section>
  )
}

export default Demo