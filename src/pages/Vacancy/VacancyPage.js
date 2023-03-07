import React, { useContext, useEffect, useState } from "react";
import { useHome } from "../../context/HomeContext";
import { useQuery } from "react-query";
import axios from "axios";
import parse from "html-react-parser";
import { useLang } from "../../context/lang";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";
import SpinnerLoader from "../../utils/SpinnerLoader";
import { FaSearch } from "react-icons/fa";
import { LangContext } from "../../context/LangContext";
const VacancyPage = () => {
  const [vacancyData, setVacancyData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsId, setdetailsId] = useState(null);
  const [catId, setCatId] = useState(null);
  const navigate = useNavigate();
  const { isAmh } = useContext(LangContext);
  const { setVacancyId, vacancyId } = useHome();
  console.log(catId);
  const Vacancies = useQuery(
    [`VacanciesApi`, currentPage, vacancyId],
    async () =>
      await axios.get(
        vacancyId
          ? `https://admin.hulum.et/public/api/vacancy_categories/${vacancyId}?page=${currentPage}`
          : `https://admin.hulum.et/public/api/selfJourney-vacancy?page=${currentPage}`
      ),
    {
      keepPreviousData: false,
      // http://admin.hulum.et/public/api/home-page
      refetchOnWindowFocus: false,
      retry: false,

      onSuccess: (res) => {
        if (vacancyId === null) {
          setVacancyData(res?.data?.data);
          console.log(res);
        } else {
          setVacancyData(res?.data?.data);
          console.log(res);
        }
      },
    }
  );
  console.log(Vacancies?.data?.data)
  // details
  const detailsData = useQuery(
    ["detailsDataApi", detailsId],
    async () =>
      await axios.get(
        `https://admin.hulum.et/public/api/selfJourney-vacancy/${detailsId}`
      ),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,

      onSuccess: () => {},
    }
  );
  console.log(detailsData?.data?.data);
  const VacancyCategory = useQuery(
    `CategoryApi`,
    async () =>
      await axios.get("https://admin.hulum.et/public/api/vacancy_categories"),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,

      onSuccess: (res) => {},
    }
  );
  
  return (
    <div>
      <div className="max-w-6xl mx-auto flex flex-col pt-28 ">
        <div className="relative grid grid-cols-1 md:grid-cols-2 items-start  gap-3">
          {/* grid one */}
          <div className="w-full flex flex-col items-start justify-between space-y-2">
            {/* <div className="w-full flex items-center bg-white  border-2 border-gray-400 rounded-md">
              <input
                type="text"
                name=""
                id=""
                placeholder="search a job"
                className="flex  flex-grow border-none focus:outline-none focus:border-none focus:ring-0"
              />
              <FaSearch
                size={22}
                className="pr-2 text-gray-500 flex  flex-grow-0"
              />
            </div> */}
            {/* filter */}
            <div className=" pt-2 flex flex-col items-start    space-y-1 ">
              <h1 className="font-semibold text-sm text-gray-500">
                {isAmh ? "" : "Filter By"}
              </h1>
              <select
                name=""
                id=""
                onChange={(e) => setVacancyId(e.target.value)}
                className="px-3 py-2 font-medium text-gray-500 bg-white border-blue-400 border-2 rounded-lg"
              >
                {VacancyCategory.isFetched ? (
                  VacancyCategory?.data?.data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {isAmh ? item.name_am : item.name}
                    </option>
                  ))
                ) : (
                  <Center width={"100%"} height={"70vh"}>
                    <SpinnerLoader />
                  </Center>
                )}
              </select>
            </div>
            {/* jobs-grid */}
            <div className="w-full py-2 flex flex-col items-start space-y-2 my-3">
              {Vacancies.isFetched ? (
                vacancyData?.length > 0 ?
                vacancyData?.map((item) => {
                  return (
                    <div
                      key={item?.id}
                      className="relative flex flex-col bg-white hover:border hover:border-[#00a69c]
               flex-grow hover:scale-[1.02] transition-all ease-in-out duration-300 cursor-pointer w-full p-3 pb-12 rounded-md shadow-md space-y-2 border border-gray-300"
                    >
                      <div className="w-full flex items-center justify-between  ">
                        <span className="font-bold text-lg ">
                          {!isAmh ? item.title_am : item?.title}
                        </span>
                        <span className="font-bold text-sm text-[#00a69c] ">
                          New
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-regular line-clamp-3">
                          {parse(
                            isAmh ? item.description_am : item.description
                          )}
                        </span>
                      </div>
                      <h1 className="font-regular text-gray text-sm text-gray-400 ">
                        Due date:{item?.due_date}
                      </h1>

                      <div className="absolute bottom-2 flex items-start  float-left pt-6">
                        <button
                          onClick={() => setdetailsId(item.id)}
                          className="bg-[#00a69c]  p-1 px-5 font-medium text-white rounded-md hover:opacity-70"
                        >
                          {isAmh ? "ዝርዝር እይታ" : "View detail"}
                        </button>
                        {/* <Link to={`/vacancy-details/${item?.id}`} className="flex flex-grow ">
                   </Link> */}
                      </div>
                    </div>
                  );
                }) :
                <div className="flex items-center justify-items-center p-5">
                  <h1 className="font-medium text-2xl">No Vacancies Found</h1>
                </div>
              )
              
              : (
                <Center width={"100%"} height={"70vh"}>
                  <SpinnerLoader />
                </Center>
              )}
            </div>
          </div>
          {/* details grid */}
          {detailsId !== null && (
            <div className=" h-fit z-20 top-20 flex left-10 w-full ">
              {detailsData.isFetched ? (
                <div className="bg-white shadow-md rounded-md p-4">
                  <h1 className="font-bold text-lg py-2">
                    {detailsData?.data?.data?.title}
                  </h1>
                  <div className="border-gray-300 p-2 border-y">
                    <p className="xapitalize font-medium text-[#00a69c]">
                      job summary
                    </p>
                  </div>
                  <div className="p-2 py-3">
                    <div className="flex items-center justify-between w-full">
                      <p>Job type</p>
                      <span className="font-medium">
                        {(detailsData?.data?.data?.job_type == 0 &&
                          "Cotractural") ||
                          (detailsData?.data?.data?.job_type == 1 &&
                            " Fulltime") ||
                          (detailsData?.data?.data?.job_type == 2 &&
                            " Internship") ||
                          (detailsData?.data?.data?.job_type == 3 &&
                            " Partime") ||
                          (detailsData?.data?.data?.job_type == 4 && "Remotly")}
                      </span>
                    </div>
                    <div>
                      <p>description</p>
                      <span>
                        {parse(
                          isAmh
                            ? detailsData?.data?.data?.description_am
                            : detailsData?.data?.data?.description
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <Center width={"100%"} height={"70vh"}>
                  <SpinnerLoader />
                </Center>
              )}
            </div>
          )}
        </div>

        {/* old */}
      </div>
    </div>
  );
};

export default VacancyPage;

// <div className=" flex flex-col sm:flex-row items-center justify-between p-3  space-y-3">
//           {Vacancies?.data?.data?.prev_page_url !== null &&<button
//            onClick={() =>{
//             if(Vacancies?.data?.data?.prev_page_url!== null){
//               setCurrentPage(old => Math.max(old - 1, 0))
//             }
//            }}
//            disabled={Vacancies?.data?.data?.prev_page_url === null}
//           className="w-full sm:w-auto p-2 bg-[#00a69c] text-white font-medium rounded-md px-3
//            disabled:cursor-not-allowed">{isAmh ? 'የቀድሞ ' : 'previous'}</button>}
//          {Vacancies?.data?.data?.next_page_url !== null && <button
//            onClick={() => {
//              if (Vacancies?.data?.data?.next_page_url !== null) {
//               setCurrentPage(old => old + 1)
//             }
//           }}

//           disabled={Vacancies?.data?.data?.next_page_url === null}
//           className="w-full sm:w-auto p-2 bg-[#00a69c] text-white font-medium rounded-md px-3
//           disabled:cursor-not-allowed">{isAmh? 'ቀጣይ' : 'next'}</button>}
//         </div>
