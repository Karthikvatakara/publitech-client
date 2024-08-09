import React, { useEffect, useState } from 'react'
import Navbar from '../../components/landPage/Navbar'
import CourseListPage from '../../assets/courses/2-after-edit.png'
import Card from '../../components/landPage/Card';
import { URL } from '../../common/api';
import axios from 'axios';
import { CourseEntity } from '../../interface/courseEntity';
import { config } from '../../common/configurations';
import TypeWriterAnimation from '../../components/common/TypeWriterAnimati/TypeWriterAnimation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Player } from '@lottiefiles/react-lottie-player';
import { CategoryEntity } from '../../types/categoryEntity';


function CourseListingUser() {
    const [ courseData,setCourseData ] = useState<CourseEntity[] | null>(null)
    const [ loading,setLoading ] = useState<boolean>(false);
    const [ category,setCategory ] = useState<string>('');
    const [ search,setSearch ] = useState<string>('');
    const [ sort,setSort ] = useState<string>('');
    const [ page,setPage ] = useState<number>(1);
    const [ totalPages,setTotalPages ] = useState<number>(1);
    const [ categories,setCategories ] = useState< CategoryEntity[] |null>(null)


    const getData = async() => {
       try{
        const response = await axios.get(`${URL}/api/course/courseListToStudent`,{
            ...config,
            params: { search, category, sort, page}
        })
        setCourseData(response.data.data);
        setTotalPages(response.data.totalPages);   
        setLoading(false)
       }catch(error){
        console.error('error fetching courses',error)
       }
    }

    const getCategories = async() => {
        try{
            const res = await axios.get(`${URL}/api/course/admin/category`,config)
            setCategories(res.data.data);
        } catch(error){
            console.error('error fetchig category',error);
        }
    }
    useEffect(() => {
        setLoading(true);
        getData();
        getCategories();
        AOS.init({
            duration: 1000,
            once: true,
          });
    },[ search,category,sort,page])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        setCategory(e.target.value);
        setPage(1);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
        setPage(1);
    };
  return (
   <>
   <Navbar/>
   <div className='grid lg:grid-cols-12  md:grid-cols-12 grid-cols-1' data-aos="fade-left">
        <div className="lg:col-span-8 md:col-span-8 col-span-1 flex justify-center items-center">
            <div className="lg:space-y-4  md:space-y-2 lg:text-5xl md:text-3xl text-xl lg:p-0 md:p-2 p-4">
            <h1 className='font-bold  text-darkBlue'>
            <TypeWriterAnimation text='unlock Your Potential With' delay={100}/>
            </h1>
            <h1 className='font-bold  text-darkBlue '>publitech</h1>
            <p className='text-sm font-bold text-gray-500 '>Welcome to our e-learning platform! Discover accessible, engaging, <br />and 
                transformative learning experiences. Empower yourself with diverse courses,<br /> connect with experts, and unlock your potential. Embrace the future of education—your <br /> journey to success begins here!</p>
            </div>
        </div>
        <div className="md:col-span-4 lg:col-span-4 col-span-1" >
            <img src={CourseListPage} alt="" />
        </div>
        </div>
        <div className='flex flex-col items-center justify-center mt-8 lg:p-0 md:p-2 p-4'>
            <h1 className='font-bold lg:text-2xl md:text-xl text-md text-darkBlue'>All the Skills you need in One place</h1>
            <h1 className='font-bold lg:text-xl md:text-sm text-xs  text-gray-500'>from critical skills to technical skills publitech support your personal development </h1>
        </div>
        <div className='flex justify-center items-center mt-8'>
        <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={handleSearch}
        className="w-1/5 sm:w-1/2 md:w-1/4 p-1 border sm:m-0 sm:mr-2 mr-7 border-gray-300  focus:outline-none rounded-xl focus:ring-2 bg-gray-200 focus:ring-darkBlue"
        />

        <div className='flex items-center'>
            <select 
                value={category}
                onChange={handleCategoryChange}
                className='bg-darkBlue text-white font-bold px-2 py-1 rounded-xl sm:m-2 sm:ml-2 ml-7'
                >
                <option value="">All Categories</option>
                { categories?.map((cat,index) => (
                    <option key={index} value={cat._id}>{cat.title}</option>
                ))}
            </select>
        <div className='text-xl text-darkBlue m-2'>
            <select
             value={sort}
             onChange={handleSortChange}
             className='bg-white border border-darkBlue text-darkBlue font-bold px-2 py-1 rounded-xl'
             >
                <option value="">Sort By</option>
                <option value="title_asc">Name A-Z</option>
                <option value="title_desc">Name z-A</option>
                <option value="price_asc">price low to high</option>
                <option value="price_desc">price high to low</option>
            </select>
        </div>
        </div>
        </div>
        {loading &&<Player
                        autoplay
                        loop
                        src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
                        style={{ height: '200px', width: '200px' }}
                     />} 
                     
                     {courseData && courseData.length !== 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-7'>
                    {courseData.map((course) => (
                    <Card key={course._id} course={course} />
                ))}
                    </div>
                ) : (
                <div className='flex justify-center items-center h-[calc(100vh-200px)]'>
                <Player
                    autoplay
                    loop
                    src="https://lottie.host/f1f86a63-e042-4e92-8f92-8eba70f38a69/2pzqd7M4BA.json"
                    style={{ height: '250px', width: '250px' }}
                />
                </div>
                )}
            <div className="flex justify-center mt-4 mb-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`mx-1 px-3 py-1 rounded ${pageNum === page ? 'bg-darkBlue text-white' : 'bg-gray-200'}`}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>
   </>
  )
}

export default CourseListingUser