import React,{useState,useContext,useRef,useEffect} from 'react'
import { LangContext } from "../../context/LangContext";
import {useQuery} from 'react-query'
import axios from 'axios'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Logo from "../../assets/art1.png";
import path4 from "../../assets/Path4.png";
import path12 from "../../assets/Path12.png";
import Group1 from "../../assets/Group1.png";
import Group2 from "../../assets/Group2.png";
import banner from "../../assets/land01.jpg";
import Bussiness from "../../assets/Business.png";
import Career from "../../assets/Career.png";
import Education from "../../assets/Education.png";
import Development from "../../assets/Development.png";
import SelfCare from "../../assets/SelfCare.png";
import Social from "../../assets/Social.png";
import journey from "../../assets/journey.png";
import MobileBanner from "../../assets/MobileBanner.png";
import LoginModal from './components/LoginModal';
import SpinnerLoader from '../../utils/SpinnerLoader';
import {Spinner,Center,useMediaQuery,} from "@chakra-ui/react";
const LoginPage = () => {
  const { isAmh, changeLang } = useContext(LangContext);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px )");
  const [isModalOpen,setIsModalOpen] = useState(false)
  const handleModal=()=>{
    setIsModalOpen(!isModalOpen)
  }
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = e => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth"
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

const Journeys= useQuery(`LoginJourney`,async () =>
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}login-page`),
  {
  keepPreviousData: false,
  refetchOnWindowFocus: false,
  retry: false,
  onSuccess: (res) => {
    
  },
  }
  );
  console.log(Journeys?.data?.data?.data)
  return (
    <div>
        <Navbar handleModal={handleModal}/>
        <div className='relative'>
          <div className='flex sm:hidden absolute inset-0 bg-black/60'></div>
      { isLargerThan768 ? <img src={Logo} alt="" className="h-[400px] lg:h-auto  
        w-full  object-cover md:object-contain  " /> : <img src={MobileBanner} alt="" className="h-[400px] lg:h-auto  
        w-full  object-cover md:object-contain  " />  }
        <div className=" absolute px-3 sm:px-14 md:px-6 lg:px-24 2xl:px-40 
          top-1/3 flex flex-col items-start">
        <div className='max-w-2xl md:max-w-sm lg:max-w-xl flex flex-col items-center sm:items-start justify-start  space-y-3 px-2 sm:px-0'>
         <h1 className="font-bold text-white sm:text-stone-900 text-3xl sm:text-3xl lg:text-5xl ">
         {isAmh ? 'ከእኛ ጋር ፣ የእርስዎ':'With us, your'}</h1>
         <div className='flex items-center space-x-2'>
         <img src={journey} alt="" className='h-[40px] sm:h-20 object-contain'/>
         <h1 className="font-bold text-white sm:text-stone-900 text-3xl sm:text-3xl lg:text-5xl "> {isAmh ?'ብሩህ ነው!':'is Bright!'}</h1>
         </div>
       <p className='font-md text-white sm:text-stone-900 text-sm text-center sm:text-left'>
        {isAmh ? 'የራስ ጉዞ አንድ ሰው በዓላማ የሚመራ ህይወት መኖር የሚጀምርበት እና በመንገዱ ላይ ከፍተኛ መጠን ያለው ድጋፍ የሚያገኙበት መድረክ ነው':'Self Journey is a platform where one can start living a purpose driven life and get a tremendous amount of support along the way.'}
       </p>
       <button onClick={handleModal}
       className='bg-[#00a69c] p-2 px-6 text-white font-medium rounded-md'>
        {isAmh? 'ጀምር':'Get Started'}
       </button>
        </div>
        </div>
        </div>

         {/* second */}
      <div>
       <div className='flex items-center justify-center pt-5  lg:pt-20'>
        <h1 className='font-bold text-3xl md:text-5xl text-black'>{isAmh ? 'የሕይወት':'Life'}
        <span className='text-[#f16a34]'> {isAmh ? 'ጉዞ':'Journey'}</span></h1>
      
       </div>

        <div className="flex items-center max-w-6xl mx-auto p-3 sm:pr-10
         space-x-4 pt-10 overflow-x-scroll scrollbar-hide" ref={elRef}>
          {Journeys.isFetched ? (
              Journeys?.data?.data?.data?.map((item)=>(
                <div onClick={handleModal}
                className='relative flex flex-shrink-0 w-[199px] h-[195px]  flex-grow  flex-col items-start
                 bg-white shadow-lg p-1 cursor-pointer space-y-1 '>
                 <img src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}${item?.image}`} alt="" className="h-[115px] max-h-[115px] w-[189px]  object-cover rounded-lg" />
                 <p className='text-sm text-black line-clamp-2 '>{isAmh? item?.nameAm : item?.name}</p>
                 <p className='absolute bottom-1 text-[13px] text-[#F17A2D] font-medium'>{isAmh? item?.category?.nameAm : item?.category?.name}</p>
                </div>
              ))
          ):(
         <Center>
          <SpinnerLoader />
        </Center>
          )}
      

        </div>
     </div>
     {/* third */}
     <div className='max-w-5xl mx-auto'>
     <div className='flex flex-col space-y-2 items-center justify-center pt-20'>
      <h1 className='font-bold text-3xl xl:text-5xl md:text-4xl text-center text-black'>{isAmh ? 'ምን እናቀርባለን?':'What We Provide?'}</h1>
        <h1 className='font-bold text-lg xl:text-3xl md:text-2xl text-center text-black'>{isAmh ? 'ተግባራዊ የማግኘት አዲስ ዘዴ።':'A fresh method of gaining practical.'}
        <span className='text-[#90BF3E]'> {isAmh ? 'ልምድ':'experience'}</span></h1>
      <p className='max-w-2xl text[13px] sm:text-sm text-center md:text-left  text-[#949494]'>
        {isAmh? 'በህይወታችሁ ላይ ለውጥ ለማምጣት የሚረዱ ማለቂያ የሌላቸውን እድሎች እና እሴቶችን እናመጣለን።':'We bring you endless opportunities and values that can help you in bringing change to your life.'}</p>
       </div>

       <div className='grid grid-cols-1 md:grid-cols-2 pt-10 gap-5 items-center justify-center p-3'>
         <div className='h-96  flex items-center justify-center flex-grow'>
         <img src={Group1} alt="" className="h-full w-full  object-contain  rounded-lg" />
         </div>
         <div className='flex flex-col items-start space-y-3'>
          <h2 className='font-bold text-2xl md:text-3xl text-center md:text-left'>{isAmh ? 'ወደ ታላቅነት የሚወስድህ የዕለት ተዕለት መድረክ!':'The everyday platform to take you to greatness!'}</h2>
          <p className='text-[#949494] text-sm max-w-md text-center md:text-left'>
            {isAmh ? 'የራስ ጉዞ በጣም ጥሩውን ጉዞ ለማድረግ እና ደስተኛ እና አላማ ያለው ህይወት ለመኖር ግቦቻችሁ ላይ ለመድረስ የሚፈልጉትን ሁሉ የሚያገኙበት መድረክ ነው።':'Self Journey is a platform where you can find everything you need to have the best possible journey and reach your goals to live a happy and purposeful life.'}</p>
         </div>
       </div>
     </div>

     {/* how it works */}
     <div className="pt-20 md:pt-36" id="test1">
      <h1 className='text-center p-3 font-bold text-4xl'>{isAmh ? 'እንዴት እንደሚሰራ':'How It Works'}</h1>
      <div className='relative z-10 '>
        <div className='hidden md:flex absolute top-5 w-full h-24 z-10 '>
          <img src={path4} alt="" className='w-full z-20'/>
        </div>
     <div className='z-50 pt-5 sm:pt-12 max-w-6xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 p-3'>
        <div className='flex flex-col items-start space-y-2 border
         border-[#D9A529] bg-[#F1F1F1] p-4 rounded-lg'>
          <img src={banner} alt="" className='rounded-full w-20 h-20' />
          <h1 className='font-bold text-lg'>{isAmh ? 'መጽሔቶች':'Journals'}</h1>
          <p className='text-[13px]'>{isAmh ? 'በጉዞዎ ውስጥ እርስዎን ለመደገፍ ተከታታይ መጽሔቶችን እናቀርብልዎታለን። መጽሔቶቹ በደንብ ተመርምረዋል እና አንድ ሰው እነሱን ለመከታተል እና የአንድ የተወሰነ የጉዞ ጉዞዎችን ለማግኘት በሚያስችል መንገድ ተዘጋጅተዋል።':'We provide you with a series of journals to support you in your journeys. The journals are well researched and prepared in such a way that one can follow them through and get the takeaways of a specific Journey.'}</p>
     
        </div>
        {/* second */}
        <div className='flex flex-col items-start space-y-2 border
         border-[#90BF3E] bg-[#F1F1F1] p-4 rounded-lg'>
          <img src={banner} alt="" className='rounded-full w-20 h-20'  />
          <h1 className='font-bold text-lg'>{isAmh ? 'መጣጥፎች':'Articles'}</h1>
          <p className='text-sm'>{isAmh ? 'እድሎችን የሚያመጡ መጣጥፎችን እናቀርብልዎታለን። እነዚህ መጣጥፎች በአካባቢዎ እጅግ በጣም ብዙ እድሎች እንዳሉ ለማሳወቅ ተዘጋጅተዋል እና ከእነሱ በፊት መዘጋጀት ያስፈልግዎታል።':'We provide you with Articles that bring opportunities. These articles are prepared to let you know that there are a tremendous amount of opportunities around you and you need to be prepared ahead of them.'}</p>
        </div>
        {/* third */}
        <div className='flex flex-col items-start space-y-2 border
         border-[#F16A37] bg-[#F1F1F1] p-4 rounded-lg'>
          <img src={banner} alt="" className='rounded-full w-20 h-20' />
          <h1 className='font-bold text-lg'>{isAmh ? 'ክፍት የስራ ቦታዎች':'Vacancies'}</h1>
          <p className='text-[13px]'>{isAmh ? 'ለእርስዎ የስራ ክፍት ቦታዎችን እናቀርባለን። ስለእርስዎ መረጃ እንወስድዎታለን እና እርስዎ ሊያርፉ የሚችሉ ክፍት የስራ ቦታ በተገኘ ቁጥር ኤስኤምኤስ እንልክልዎታለን። ማወቅ ያለብዎት እና እነሱን መሬት ላይ ማድረግ ያለብዎት ነገር ሁሉ እንዲሁ ይቀርባል።':'We provide Job Vacancies for ‘you’. We will take information about you and we will send you an SMS every time a vacancy is available that you can land. Everything you need to know and have to land them will be provided too.'}</p>
    
        </div>
      </div>
      </div>
    
     </div>
     </div>
     {/* Why Us? */}
     <div className='pt-12 max-w-5xl mx-auto'>
      <h1 className='text-center p-3 font-bold text-4xl'>{isAmh ? 'ለምን እኛ':'Why Us'}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 pt-5 gap-5 p-2'>
         <div className='flex flex-col items-start space-y-3 max-w-md'>
          <h2 className='font-bold text-2xl md:text-3xl text-center md:text-left'>{isAmh ? 'የሕይወት ጉዞዎ ስለ ሁሉም ነገር ይዘቶችን እናቀርባለን።':'We provide contents about everything your life journey is about.'}</h2>
          <p className='text-[#949494] text-sm text-center md:text-left'>{isAmh ? 'የሕይወት ጉዞዎ ስለ ሁሉም ነገር ይዘቶችን እናቀርባለን። አካታችነት ነው እየሰራን ያለነው። ከወላጅነት እስከ ትምህርት፣ ከአገልግሎት አቅራቢ እስከ ንግድ፣ እራስን መንከባከብ ለራስ ማሳደግ፣ ከጋብቻ ጋር መጠናናት እና ከዛም በላይ፣ ማወቅ ያለብዎት እና ለመዘጋጀት የሚፈልጓቸው ነገሮች በሙሉ በይዘት አወቃቀራችን ውስጥ ተካትተዋል።':'We provide contents about everything your life journey is about. Inclusiveness is what we are working on. Starting from Parenting to Education, Carrier to Business, Self-Care to self Development , Dating to Marriage and Beyond, Everything you need to know and be prepared for are included in our content structure.'}</p>
          <div className='pl-1 flex flex-col items-start space-y-2'>
<div className='flex items-start space-x-1 text-[#949494] '>
 <AiOutlineCheckCircle size={25}/>
 <p className='text-[13px]'>{isAmh ? 'አገልግሎቱን የምናቀርበው እርስዎን ሊያስተጋባሉ የሚችሉ ድር፣ የሞባይል መድረኮችን እና ሌሎች ቴክኖሎጂዎችን በመገንባት ነው።':'We provide the service by building web, mobile platforms and other technologies that can resonate with you.'}</p>
</div>
<div  className='flex items-start space-x-1 text-[#949494]'>
 <AiOutlineCheckCircle size={25}/>
 <p className='text-[13px]'>{isAmh ? 'አገልግሎቱን የምናቀርበው እርስዎን ሊያስተጋባሉ የሚችሉ ድር፣ የሞባይል መድረኮችን እና ሌሎች ቴክኖሎጂዎችን በመገንባት ነው።':'We provide the service by building web, mobile platforms and other technologies that can resonate with you.'}</p>
</div>
<div  className='flex items-start space-x-1 text-[#949494]'>
 <AiOutlineCheckCircle size={25}/>
 <p className='text-[13px]'>{isAmh ? 'አንድ ሰው በእጃቸው ጫፍ ላይ ማለቂያ የሌላቸውን እድሎች የሚያገኙበት የ hulum ስራዎችን እንደ መድረክ አዘጋጅተናል።':'We have developed hulum jobs as a platform where one can get endless opportunities on their fingertips.'}</p>
</div>
<div  className='flex items-start space-x-1 text-[#949494]'>
 <AiOutlineCheckCircle size={25}/>
 <p className='text-[13px]'>{isAmh ? 'ጉዞዎን የሚከተል እና በእያንዳንዱ እርምጃ የሚፈልጉትን ድጋፍ የሚሰጥ የድር መተግበሪያ ይሰጥዎታል።':'You will be provided with a web app which follows your journey and provides the support you need in every step.'}</p>
</div>
<div  className='flex items-start space-x-1 text-[#949494]'>
 <AiOutlineCheckCircle size={25}/>
 <p className='text-[13px]'>{isAmh ? 'በጉዞዎ ጊዜ ሁሉ ሊያደርጉት ያቀዱትን እያንዳንዱን እርምጃ በኤስኤምኤስ እናስታውስዎታለን።':'We will alert and remind you through SMS for every action you set to perform throughout your Journey.'}</p>
</div>
</div> 
         </div>
         <div className='h-[400px]'>
         <img src={Group2} alt="" className="h-full w-full  object-contain  rounded-lg" />
         </div>
       </div>
     </div>
    
    {/* What Will You Discover? */}
    <div className=' sm:max-w-5xl sm:mx-auto py-5 my-10 rounded-l-2xl mb-10 m-3'>
      <div className='max-w-[560px] text-center mx-auto pb-10
      flex flex-col items-center justify-center sm:space-y-1 text-black'>
     <h1 className='text-center p-3 font-bold text-2xl md:text-4xl'>{isAmh ? 'ምን ታገኛለህ?':'What Will You Discover?'}</h1>
     <p className='text-sm px-2'>{isAmh ? 'አዳዲስ ተሰጥኦዎችን ያግኙ፣ ወቅታዊ ፍላጎቶችን ያሳድጉ እና በውስጣዊ ጉዞዎ ውስጥ እራስዎን ያጣሉ። ያገኙት መረጃ ሊያስገርምህ እና ሊያነሳሳህ ይችላል።':'Discover new talents, develop current passions, and lose yourself in your inner journey. The information you uncover may astound and motivate you.'}</p>
     </div>

       <div className='relative z-10'>
       <div className='hidden md:flex absolute top-20 w-full  h-10'>
        <img src={path12} alt="" className='w-full '/>
       </div>
       <div className='flex flex-col space-y-3'>
    <div className=' md:hidden grid grid-cols-2 md:grid-cols-3  gap-4 '>
       <div className='group relative border border-[#00a69c] rounded-md p-1 flex flex-col space-y-2 items-center justify-center'>
        <img src={Education} alt="Education" className=' object-contain pb-2 '/>
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'ትምህርት':'Education'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[10px] font-medium px-5 text-black text-center'>{isAmh ? 'የተለያዩ የዉጭ የትምህርት እድሎችን ጠቃሚ ምክሮችን እና መመሪያዎችን ያገኛሉ። ለተሻለ ስራ እና ህይወት መሳካት የሚያግዙ የቅድመ ስኮላርሽፕ እና የድህረ ስኮላርሽፕ የትምህርት አይነቶችን ያቀርባል።' : 'Scholarship opportunities, tips and guidance in landing them and the pre-scholarship preparations and the post-scholarship disciplines towards a better career and life will be delivered.'}</p>
        </div>
       </div>
       <div className='group relative  border border-[#00a69c] rounded-md p-1 flex flex-col space-y-2 items-center justify-center'>
        <img src={Career} alt="Career" className=' object-contain pb-2 '/>
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'ሙያ':'Career'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[10px] font-medium px-5 text-black text-center'>{isAmh ? 'የእኛ ዌብሳይት የቅጥር CV ለማዘጋጀት ብቁ እንዲሆኑ እንዲሁም የተሻለ ስራ እንዲያገኙ ያግዞዎታል ።' : 'Our platform equips you with all the necessary soft skills including preparing your CV to land a better job.'}</p>
        </div>
       </div>
       <div className='group relative border border-[#00a69c] rounded-md p-1 flex flex-col space-y-2 items-center justify-center'>
        <img src={Bussiness} alt="Bussiness" className=' object-contain ' />
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'ንግድ':'Bussiness'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[10px] font-medium px-5 text-black text-center'>{isAmh ? 'እርስዎን ለመርዳት እኛ የንግድ ሥራ ጥናቶችን እናዘጋጃለን እንዲሁም የተለያዩ መረጃዎችን በመሰብሰብ "የራሴን ስራ ለመስራት እንዲሁም ስራዬን ለማሳደግ ምን ያስፈልገኛል" የሚሉትን ጥያቄዎች መልስ ያገኛሉ።' : 'We prepare business researches and gather information so that you are aware of what opportunities are there to start or expand your own business.'}</p>
        </div>
       </div>
     
       <div className='group relative  border border-[#00a69c] rounded-md p-1 flex flex-col space-y-2 items-center justify-center'>
        <img src={Social} alt="Education" className=' object-contain pb-2'/>
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'ማህበራዊ ህይወት':'Social Life'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[10px] font-medium px-5 text-black text-center'>{isAmh ? 'ማህበራዊ ኑሮ ላይ ከማህበረሰቡ ጋር የምንገናኝበት እና እርስ በርስ የምንረዳዳበትን መድረክ አዘጋጅተናል። በተጨማሪም የፍቅር አጋሮንየሚያገኙበት እና ዘላቂ የፍቅር ግንኙነትየሚፈጥሩበት ዌብሳይት ተዘጋጅቷል።' : 'Social life is where we interact with the community and serve each other. We have also developed a Dating platform where you can find your better half and create a lasting relationship.'}</p>
        </div>
       </div>
       <div className='group relative border border-[#00a69c] rounded-md p-1 flex flex-col space-y-2 items-center justify-center'>
        <img src={SelfCare} alt="Career" className=' object-contain pb-2'/>
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'ራስን መንከባከብ':'Self Care'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[10px] font-medium px-5 text-black text-center'>{isAmh ? 'የጤና ፣ የውበት ፣ የአካል ብቃት እና ጤና አመጋገብ ምክሮችን እናሳዮታለን።' : 'We address health, beauty, fitness and nutrition issues to support your journey to having a healthy lifestyle.'}</p>
        </div>
       </div>
       <div className='group relative border border-[#00a69c] rounded-md p-1 flex flex-col space-y-2 items-center justify-center'>
        <img src={Development} alt="Bussiness" className=' object-contain pb-2' />
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'የራስ እድገት':'self Development'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[10px] font-medium px-5 text-black text-center'>{isAmh ? 'ግንዛቤ መፍጠር እና የራስ እድገት በሰልፍ ጆርኒ ዌብ ሳይት ውስጥ ተካተዋል። እንዲሁም የራስ እድገትን ለማምጣት አስፈላጊ ይዘት ያላቸው ጽሁፎችን እና ጽንሰ-ሐሳቦችን ከተለያዩ ምንጮች እናዘጋጃለን።' : 'We have compiled concepts from different sources, in such a way that it resonates with our community to bring the necessary change to the discipline and habits in our identity.'}</p>
        </div>
       </div>
       </div>
       </div>
{/* medium screen */}
<div className='flex flex-col space-y-3'>


<div className='hidden md:grid grid-cols-3 md:grid-cols-3  gap-6 sm:pl-10'>
       <div className='group relative border border-[#00a69c] rounded-md p-1 cursor-pointer  flex flex-col items-center justify-center'>
        <img src={Education} alt="Education" className='h-36 object-contain pb-2'/>
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'ትምህርት':'Education'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[13px] font-medium px-5 text-black text-center'>{isAmh ? 'የተለያዩ የዉጭ የትምህርት እድሎችን ጠቃሚ ምክሮችን እና መመሪያዎችን ያገኛሉ። ለተሻለ ስራ እና ህይወት መሳካት የሚያግዙ የቅድመ ስኮላርሽፕ እና የድህረ ስኮላርሽፕ የትምህርት አይነቶችን ያቀርባል።' : 'Scholarship opportunities, tips and guidance in landing them and the pre-scholarship preparations and the post-scholarship disciplines towards a better career and life will be delivered.'}</p>
        </div>
       </div>
       <div className='group relative border border-[#00a69c] rounded-md p-1 cursor-pointer flex flex-col space-y-2 items-center justify-center'>
        <img src={Career} alt="Career" className='h-36 object-contain pb-2'/>
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'ሙያ':'Career'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[13px] font-medium px-5 text-black text-center'>{isAmh ? 'የእኛ ዌብሳይት የቅጥር CV ለማዘጋጀት ብቁ እንዲሆኑ እንዲሁም የተሻለ ስራ እንዲያገኙ ያግዞዎታል ።' : 'Our platform equips you with all the necessary soft skills including preparing your CV to land a better job.'}</p>
        </div>
       </div>
       <div className='group relative border border-[#00a69c] rounded-md p-1 cursor-pointer flex flex-col space-y-2 items-center justify-center'>
        <img src={Bussiness} alt="Bussiness" className='h-36 object-contain pb-2' />
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'ንግድ':'Bussiness'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[13px] font-medium px-5 text-black text-center'>{isAmh ? 'እርስዎን ለመርዳት እኛ የንግድ ሥራ ጥናቶችን እናዘጋጃለን እንዲሁም የተለያዩ መረጃዎችን በመሰብሰብ "የራሴን ስራ ለመስራት እንዲሁም ስራዬን ለማሳደግ ምን ያስፈልገኛል" የሚሉትን ጥያቄዎች መልስ ያገኛሉ።' : 'We prepare business researches and gather information so that you are aware of what opportunities are there to start or expand your own business.'}</p>
        </div>
       </div>
       </div>

       <div className='hidden md:grid grid-cols-3 md:grid-cols-3  gap-6 sm:pr-10'>
       <div className='group relative  border border-[#00a69c] rounded-md p-1 cursor-pointer flex flex-col space-y-2 items-center justify-center'>
        <img src={Social} alt="Education" className='h-36 object-contain pb-2'/>
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'ማህበራዊ ህይወት':'Social Life'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[13px] font-medium px-5 text-black text-center'>{isAmh ? 'ማህበራዊ ኑሮ ላይ ከማህበረሰቡ ጋር የምንገናኝበት እና እርስ በርስ የምንረዳዳበትን መድረክ አዘጋጅተናል። በተጨማሪም የፍቅር አጋሮንየሚያገኙበት እና ዘላቂ የፍቅር ግንኙነትየሚፈጥሩበት ዌብሳይት ተዘጋጅቷል።' : 'Social life is where we interact with the community and serve each other. We have also developed a Dating platform where you can find your better half and create a lasting relationship.'}</p>
        </div>
       </div>
       <div className='group relative border border-[#00a69c] rounded-md p-1 cursor-pointer flex flex-col space-y-2 items-center justify-center'>
        <img src={SelfCare} alt="Career" className='h-36 object-contain pb-2'/>
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'ራስን መንከባከብ':'Self Care'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[13px] font-medium px-5 text-black text-center'>{isAmh ? 'የጤና ፣ የውበት ፣ የአካል ብቃት እና ጤና አመጋገብ ምክሮችን እናሳዮታለን።' : 'We address health, beauty, fitness and nutrition issues to support your journey to having a healthy lifestyle.'}</p>
        </div>
       </div>
       <div className='group relative border border-[#00a69c] rounded-md p-1 cursor-pointer flex flex-col space-y-2 items-center justify-center'>
        <img src={Development} alt="Bussiness" className='h-36 object-contain pb-2' />
        <h1 className='font-semibold text-[#00a69c]'>{isAmh ? 'የራስ እድገት':'self Development'}</h1>
        <div className='hidden group-hover:flex absolute inset-0 bg-white/60 
          items-center justify-center transition duration-1000 ease-in-out'>
        <p className='text-[13px] font-medium px-5 text-black text-center'>{isAmh ? 'ግንዛቤ መፍጠር እና የራስ እድገት በሰልፍ ጆርኒ ዌብ ሳይት ውስጥ ተካተዋል። እንዲሁም የራስ እድገትን ለማምጣት አስፈላጊ ይዘት ያላቸው ጽሁፎችን እና ጽንሰ-ሐሳቦችን ከተለያዩ ምንጮች እናዘጋጃለን።' : 'We have compiled concepts from different sources, in such a way that it resonates with our community to bring the necessary change to the discipline and habits in our identity.'}</p>
        </div>
       </div>
       </div>
       </div>
       </div>
      
    </div>
     <Footer handleModal={handleModal}/>
     <LoginModal isModalOpen={isModalOpen} handleModal={handleModal}/>
    
    </div>
  )
}

export default LoginPage

