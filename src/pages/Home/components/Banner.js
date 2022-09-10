import React, { useContext, useEffect,useState } from "react";
import land01 from "../../../assets/land01.jpg";
import land02 from "../../../assets/land01.jpg";
import land03 from "../../../assets/land03.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
 

const Banner = () => {

  return (
   
       
       <div className="p-5 max-w-6xl mx-auto pt-20" >
       <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={3000}
        // renderIndicator={()=>(cl)}
       >
       
                <div className="    ">
                <img src={land01} alt="banner one"  className="h-full w-full  object-contain rounded-md border-2 border-white"/>
                </div>

                {/* second */}
                <div className="  ">
                <img src={land02} alt="banner one"  className="h-full w-full  object-contain rounded-md border-2 border-white"/>
                
                </div>
                {/* third*/}
                <div className=" ">
                <img src={land03} alt="banner one"  className="h-full w-full  object-contain rounded-md border-2 border-white"/>
                
                </div>
            </Carousel>
       

  
    </div>
  )
}

export default Banner