import React from 'react'
import { useState, useEffect } from 'react'
import {copy, linkIcon, loader, tick} from '../assets' // Import the deleteIcon from assets
import { useLazyGetSummaryQuery } from '../services/article'
import { MdDelete } from "react-icons/md"

const Demo = () => {
    const [article, setArticle] = useState({
        summary: '',
        url: '',
    });

    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState();
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))
        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await getSummary({ articleUrl: article.url });

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary };
            const updatedArticles = [newArticle, ...allArticles];

            setArticle(newArticle);
            setAllArticles(updatedArticles);

            localStorage.setItem('articles', JSON.stringify(updatedArticles))
        }
    }

    const handleDelete = (index) => {
        const updatedArticles = [...allArticles];
        updatedArticles.splice(index, 1);
        setAllArticles(updatedArticles);
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
    }


    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => {
            setCopied('false');
        }, 2000);
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
                    <img src={linkIcon} alt="link icon" className="absolute my-3 ml-3 w-5" />

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
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allArticles.map((item, index) => (
                        <div
                            className="link_card"
                            key={`link-${index}`}
                            onClick={() => {
                                setArticle(item);
                            }}
                        >
                            <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                                <img
                                    src={copied === item.url ? tick : copy}
                                    alt='copy'
                                    className='w-[40%] h-[40%] object-contain'
                                />
                            </div>
                            <p className='flex-1 font-satoshi text-blue-600 font-medium text-sm truncate'>
                                {item.url}
                            </p>
                            <MdDelete
                                alt='delete'
                                className='w-[5%] h-[10%] object-contain cursor-pointer'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(index);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className='my-10 max-w-full flex justify-center items-center'>
                {
                    isFetching ? (
                        <img src={loader} alt="loader" className="w-10 h-10 object-contain" />
                    ) : error ? (
                        <p className='font-inter font-bold text-blue text-center'>
                            That wasn't supposed to occur. Please try again later.
                            <br />
                            <span className="text-red-500 font-satoshi font-normal">
                                {error?.data?.error}
                            </span>
                        </p>
                    ) : (
                        article.summary && (
                            <div className='w-full flex flex-col gap-2'>
                                <h2 className='font-satoshi font-bold'>
                                    Article  <span className='blue-gradient'>Summary</span>
                                </h2>
                                <div className='summary_box'>
                                    <p className='font-inter font-medium text-blue-600 text-sm'>
                                        {article.summary}
                                    </p>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </section>
    )
}

export default Demo