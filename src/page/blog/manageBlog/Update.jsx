import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../add-blog/InputField'
import TextArea from '../add-blog/TextArea'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

const Update = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },setValue,reset
      } = useForm()
      const {id} = useParams()
      const navigate=useNavigate()
    
        const onSubmit = async(data) => {
            const BlogData = {
                title:data.title,
                description:data.description,
                image:data.blogImage,
                author:{
                    name:data.authorName,
                    image:data.authorImage
                }
            }
            console.log(BlogData);

        try {
            const toastId = toast.loading("Updating blog...");
            try {
              const response = await axios.put(`https://meta-blog-backend-jade.vercel.app/blogs/${id}`, BlogData);
              if (response && response.data) {
                toast.dismiss(toastId);
                toast.success("Blog data updated successfully!");
                navigate('/');
                reset();
              } else {
                toast.dismiss(toastId);
                toast.error("Blog update failed. Please check your data and try again.");
              }
         
            } catch (error) {
              toast.dismiss(toastId);
              toast.error("Failed to update blog. Please try again.");
              throw error; // Optionally rethrow if you want error handling elsewhere
            }
       

        } catch (error) {
            console.log(error.message);
        }
        }

        useEffect(()=>{
            const fetchSingleBlog=async()=>{
                try {
                    const response = await axios.get(`http://localhost:5000/blogs/${id}`)
                   setValue("title",blog.title)
                   setValue("description",blog?.description)
                   setValue("authorName",blog?.authorName)
                   setValue("authorImage",blog?.authorImage)
                    setValue("blogImage",blog?.blogImage)
                    console.log(response);
                   
                } catch (error) {
                    console.log(error.message);
                }
            }
            fetchSingleBlog()
        },[])
  return (
   <div className='container max-w-7xl mx-auto px-4 py-24'>
        <h2>Update Blog</h2>

          <form onSubmit={handleSubmit(onSubmit)} className='bg-white max-w-3xl p-6 rounded-lg shadow-md'>
                        <InputField  register={register("title", { required: true })} label="Blog Title" id="title" type='text' placeholder="Blog title" />

                        <TextArea label="Blog description"  register={register("description", { required: true })} placeholder="blog description" id="description" type="text"/>
                        <InputField label="Author Title"  register={register("authorName", { required: true })} id="authorName" type='text' placeholder="author name" />
                        <InputField label="Author image Url"  register={register("authorImage", { required: true })} id="authorImage" type='url' placeholder="author image url" />
                        <InputField label="Blog image url"  register={register("blogImage", { required: true })} id="blogImage" type='url' placeholder="blog image url" />

                   
                    <div className='mt-3'>
                        <button
                        type='submit'
                        className='w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>update</button>
                    </div>
                 </form>
    </div>
  )
}

export default Update