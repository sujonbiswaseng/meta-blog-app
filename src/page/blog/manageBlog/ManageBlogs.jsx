import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';

const ManageBlogs = () => {
    const [blogs,setblogs]=useState([]);
    console.log(blogs,'bos')
    const navigate = useNavigate()
     useEffect(()=>{
            fetch('https://meta-blog-backend-yxtt.vercel.app/blogs').then((res)=>res.json()).then((data)=>setblogs(data.blogs)).catch((error)=>console.error('error featching blog data :' + error))
        })
        const hadleblogDelete=async(id)=>{
            try {
                await axios.delete(`https://meta-blog-backend-yxtt.vercel.app/blogs/${id}`)
                setblogs(blogs.filter(blog=>blog.id!==id))
                alert("blog data delete sucessfully")
                navigate('/manage-blog')
                
            } catch (error) {
                console.log("Error deleting blog",error.message);
            }
        }
  return (
    <section className='container max-w-7xl mx-auto px-4 py-24'>
        <h2 className='text-2xl font-bold mb-6'>Manage Your Blogs</h2>

        <div className='overflow-x-scroll'>

            {
                blogs.length>0?( <table className="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className="p-4 border-b border-slate-600 ">
                                        <p className="text-sm font-normal leading-none ">
                                            Title
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-slate-600 ">
                                        <p className="text-sm font-normal leading-none ">
                                            Author
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-slate-600 ">
                                        <p className="text-sm font-normal leading-none">
                                            Date
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-slate-600 b">
                                        <p className="text-sm font-normal leading-none ">
                                            Actions
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    blogs.map((blog,index)=>(
                                        <tr className=''>
                                            <td className="p-4 border-b border-slate-700">
                                                <p className="text-sm  font-semibold">
                                                    <span>{index + 1}. </span>  {blog.title}
                                                </p>
                                            </td>

                                            <td className="p-4 border-b border-slate-700">
                                                <p className="text-sm  font-semibold">
                                                    {blog.author.name}
                                                </p>
                                            </td>

                                                <td className="p-4 border-b border-slate-700">
                                                <p className="text-sm  font-semibold">
                                                    {
                                                        blog?.date ? <span>{new Date(blog.date).toLocaleDateString()}</span> : <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                                    }
                                                </p>
                                            </td>

                                            <td className='p-4 flex gap-1 text-sm border-b border-slate-700'>
                                                <Link to={`/blogs/${blog._id}`} className='bg-blue-500 text-white px-2 py-1'>View</Link>
                                                <Link to={`/blogs/edit/${blog._id}`} className='bg-yellow-500 text-white px-2 py-1'>Edit</Link>
                                                <Link to={`/blogs/${blog._id}`} onClick={()=>hadleblogDelete(blog?._id)}className='bg-red-500 text-white px-2 py-1'>delete</Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>):<div>No Data Found</div>
            }
                       
              

            </div>
        
    </section>
  )
}

export default ManageBlogs