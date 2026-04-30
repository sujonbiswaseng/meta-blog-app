import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';

const BlogList = () => {
    const [searchTerm] = useState('') //TODO use Blog Contect
    const [blogs,setblogs]=useState([]);
    const [showBlog,setShowBlog] = useState(6)
    useEffect(()=>{
        fetch('http://localhost:5000/blogs').then((res)=>res.json()).then((data)=>setblogs(data.blogs)).catch((error)=>console.error('error featching blog data :' + error))
    },[])
    // filter blog base on title descirpt 

    const filterBlogs = blogs.filter(blog=> {
        return blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    }
) 

    const handleMoreBlog=()=>{
        setShowBlog(prev=>prev+3)
    }
    
    
  return (
    <div className='container mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {
                filterBlogs.slice(0,showBlog).map((item,index)=>{
                    return <BlogCard key={index} blog={item}/>
                })
            }
        </div>
          {
                showBlog<filterBlogs.length && <div className='flex  items-center justify-center w-full mt-6'>
                    <button className='bg-blue-700 text-white flex justify-center rounded-md px-4 py-2 transition-colors duration-200' onClick={handleMoreBlog}>view more</button>
                </div>
            }
    </div>
  )
}

export default BlogList