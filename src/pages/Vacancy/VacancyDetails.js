import React, { useContext, useEffect,useState } from "react";
import {
    Box,
    Button,
    HStack,
    Center,
    useMediaQuery,
    VStack,
    Spinner
  } from "@chakra-ui/react";
import Moment from 'react-moment';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useQuery} from 'react-query'
import parse from 'html-react-parser';
import { useLang } from '../../context/lang';
import { Outlet, useLocation, useNavigate ,Link,useParams} from "react-router-dom";
import { ChevronLeftIcon,ChevronRightIcon } from '@chakra-ui/icons'
import axios from 'axios'
import SpinnerLoader from '../../utils/SpinnerLoader';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const VacancyDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
const {id}=useParams()

  const navigate = useNavigate();
  const { isAmh, } = useLang()


    const fechDetails=async()=>{
      const datas = await axios.get(`http://admin.hulum.et/public/api/selfJourney-vacancy/${id}`)
      return datas?.data
    }
    const { isLoading, error, data } = useQuery(['vacancies',id],fechDetails)
   const handleChange=(id)=>{
    navigate(`/vacancy-details/${id}`)
   }


   const customLeftArrow = (
    <div className="absolute arrow-btn left-0 text-center cursor-pointer bg-[#00a69c] rounded-full  ">
     <ChevronLeftIcon w={8} h={8} color="white" />
    </div>
  );

  const customRightArrow = (
    <div className="absolute arrow-btn right-0 text-center  cursor-pointer  bg-[#00a69c] rounded-full">
       <ChevronRightIcon w={8} h={8} color="white" />
    </div>
  );
  
  const Vacancies = useQuery([`VacanciesApi`,currentPage],async () =>
  await axios.get(`http://admin.hulum.et/public/api/selfJourney-vacancy?page=${currentPage}`),
{
  keepPreviousData: false,
  refetchOnWindowFocus: false,
  retry: false,
  
  onSuccess: (res) => {},
}
);
  return (
    <div className="">
      
      {/* details */}
       <div className="sm:max-w-6xl sm:mx-auto m-5 pt-24">
        <button onClick={() => navigate(-1)} className="border border-gray-500 rounded-md p-2 flex items-center text-sm font-medium hover:opacity-50"><ChevronLeftIcon w={6} h={6} color="gray.500" />back</button>
       </div>
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-2 p-2">
    {isLoading? ( 
          <Center width={"100%"} height={"70vh"}>
          <SpinnerLoader size="xl" />
          </Center>

    ):( <div  className="col-span-12 sm:col-span-8 flex flex-col flex-grow 
     p-3 rounded-md shadow-md space-y-2 bg-white w-full">
                <div className='flex items-start space-x-1'>
             <h1 className='font-medium text-gray '>job title: </h1>
              <span className='font-medium '>{data?.title}</span>
              </div>
              <div className='flex items-center'>
                
              <span className='font-medium '>{parse(isAmh ? data?.description_am?.replaceAll("<pre>","<p>")?.replaceAll("</pre>","</p>")  :data?.description)}</span>
              </div>
              <h1 className='font-medium text-gray '>due date:{data.due_date}</h1>
              <h1 className='font-medium text-gray '>posted At:<Moment format="YYYY/MM/DD">
               {data.createdAt}
            </Moment></h1>
             <h1 className='text-semibold text-gray text-md'>{data?.job_type && 'job type:'}
             <span className='font-medium'>
              {data?.job_type == 0 &&"Cotractural" || data?.job_type == 1 &&" Fulltime" || data?.job_type == 2 &&" Internship" || data?.job_type == 3 &&" Partime" || data?.job_type == 4 && "Remotly" }</span></h1>
              <h1 className='text-semibold text-gray text-md'>location: <span className='font-medium'>{isAmh ? data.location?.name_am : data.location?.name}</span></h1>
            
            </div>)}
            {/* category part */}
           <div>
        
          </div>
      </div>

      {/* related page */}
      <div className="max-w-7xl mx-auto p-2">
        <h1 className="p-2 font-bold text-xl md:text-2xl">{isAmh ? 'ተዛማጅ ስራዎች':'Related Vacancies'}</h1>
      
      <Carousel infinite customLeftArrow={customLeftArrow}
       customRightArrow={customRightArrow} responsive={responsive} itemClass="px-2"
       swipeable={true}
       draggable={true}
       autoPlay={true}
       >
          {Vacancies.isFetched ? (
    Vacancies?.data?.data?.data?.map((item) => (
      <div key={item.id} className="relative flex flex-col flex-grow  p-3 rounded-md shadow-sm
      border border-gray-300 space-y-2 bg-white w-full">
      <div className='flex items-start space-x-1'>
   <h1 className='font-medium text-gray '>title: </h1>
    <span className='font-medium line-clamp-1'>{item.title}</span>
    </div>
    <div className='flex items-center'>
    <span className='font-medium line-clamp-3'>{parse(isAmh ? item.description_am:item.description)}</span>
    </div>
  
   
    <div className=' flex items-center justify-between'>
    <h1 className='text-semibold text-gray text-md'>location: <span className='font-medium'>{isAmh ? item.location?.name_am : item.location?.name}</span></h1>
      <button  onClick={()=>handleChange(item.id)}
      className='bg-[#00a69c] p-1 px-3 font-medium text-white
           rounded-md hover:opacity-70'>{isAmh ?  "ዝርዝር እይታ" :'View detail'}</button>
         
    </div>
  </div>

      ))
):(
<div className="flex items-center ">
  <SpinnerLoader />
  </div>
)}
      
      </Carousel>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default VacancyDetails