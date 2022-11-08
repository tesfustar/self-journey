import { Box } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useHome } from "../../context/HomeContext";
import Footer from "../../pages/Login/components/Footer";
import Navbar from "../../pages/Login/components/Navbar";

export default function TermsandConditions() {
  const { isModalOpen, setIsModalOpen } = useHome();
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  const Journeys = useQuery(
    `LoginJourney`,
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}login-page`),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res) => {},
    }
  );
  console.log(Journeys?.data?.data?.data);
  return (
    <div>
      <Navbar />

      <div className=" w-full">
        <div className="w-full py-20 md:py-28 flex flex-col space-y-3  items-center justify-center ">
          <div className=" w-full  flex flex-col items-start">
            <div
              className="max-w-6xl mx-auto w-full  flex flex-col items-center justify-center  space-y-3 px-2 
            sm:px-0"
            >
              <Box padding={8}>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  1. AGREEMENT TO TERMS
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  These Terms of Use constitute a legally binding agreement made
                  between you, whether personally or on behalf of an entity
                  (“you”) and Jaktech Engineering and Trading ("Company," “we,"
                  “us," or “our”), concerning your access to and use of the
                  https://selfjourney-et.com website as well as any other media
                  form, media channel, mobile website or mobile application
                  related, linked, or otherwise connected thereto (collectively,
                  the “Site”). We are registered in Ethiopia and have our
                  registered office at Gabon Street, Jeme'a Building 7th Floor
                  702, Addis Ababa, Addis Ababa. You agree that by accessing the
                  Site, you have read, understood, and agreed to be bound by all
                  of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE
                  TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE
                  SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY. Supplemental
                  terms and conditions or documents that may be posted on the
                  Site from time to time are hereby expressly incorporated
                  herein by reference. We reserve the right, in our sole
                  discretion, to make changes or modifications to these Terms of
                  Use at any time and for any reason. We will alert you about
                  any changes by updating the “Last updated” date of these Terms
                  of Use, and you waive any right to receive specific notice of
                  each such change. Please ensure that you check the applicable
                  Terms every time you use our Site so that you understand which
                  Terms apply. You will be subject to, and will be deemed to
                  have been made aware of and to have accepted, the changes in
                  any revised Terms of Use by your continued use of the Site
                  after the date such revised Terms of Use are posted. The
                  information provided on the Site is not intended for
                  distribution to or use by any person or entity in any
                  jurisdiction or country where such distribution or use would
                  be contrary to law or regulation or which would subject us to
                  any registration requirement within such jurisdiction or
                  country. Accordingly, those persons who choose to access the
                  Site from other locations do so on their own initiative and
                  are solely responsible for compliance with local laws, if and
                  to the extent local laws are applicable. The Site is intended
                  for users who are at least 13 years of age. All users who are
                  minors in the jurisdiction in which they reside (generally
                  under the age of 18) must have the permission of, and be
                  directly supervised by, their parent or guardian to use the
                  Site. If you are a minor, you must have your parent or
                  guardian read and agree to these Terms of Use prior to you
                  using the Site.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  2. INTELLECTUAL PROPERTY RIGHTS
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  Unless otherwise indicated, the Site is our proprietary
                  property and all source code, databases, functionality,
                  software, website designs, audio, video, text, photographs,
                  and graphics on the Site (collectively, the “Content”) and the
                  trademarks, service marks, and logos contained therein (the
                  “Marks”) are owned or controlled by us or licensed to us, and
                  are protected by copyright and trademark laws and various
                  other intellectual property rights and unfair competition laws
                  of the United States, international copyright laws, and
                  international conventions. The Content and the Marks are
                  provided on the Site “AS IS” for your information and personal
                  use only. Except as expressly provided in these Terms of Use,
                  no part of the Site and no Content or Marks may be copied,
                  reproduced, aggregated, republished, uploaded, posted,
                  publicly displayed, encoded, translated, transmitted,
                  distributed, sold, licensed, or otherwise exploited for any
                  commercial purpose whatsoever, without our express prior
                  written permission. Provided that you are eligible to use the
                  Site, you are granted a limited license to access and use the
                  Site and to download or print a copy of any portion of the
                  Content to which you have properly gained access solely for
                  your personal, non-commercial use. We reserve all rights not
                  expressly granted to you in and to the Site, the Content and
                  the Marks.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  3. USER REPRESENTATIONS
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  By using the Site, you represent and warrant that: (1) all
                  registration information you submit will be true, accurate,
                  current, and complete; (2) you will maintain the accuracy of
                  such information and promptly update such registration
                  information as necessary; (3) you have the legal capacity and
                  you agree to comply with these Terms of Use; (4) you are not
                  under the age of 13; (5) you are not a minor in the
                  jurisdiction in which you reside, or if a minor, you have
                  received parental permission to use the Site; (6) you will not
                  access the Site through automated or non-human means, whether
                  through a bot, script, or otherwise; (7) you will not use the
                  Site for any illegal or unauthorized purpose; and (8) your use
                  of the Site will not violate any applicable law or regulation.
                  If you provide any information that is untrue, inaccurate, not
                  current, or incomplete, we have the right to suspend or
                  terminate your account and refuse any and all current or
                  future use of the Site (or any portion thereof).
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  4. USER SUBSCRIPTION
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  You may be required to register before using the Site. You
                  must Send OK to 9876 or confirm your subscription via the
                  website after reading the terms and conditions to take
                  advantage of our Self Journey service. This Service is a daily
                  subscription service available to you in exchange for a daily
                  charge. You will be billed on the daily anniversary date of
                  the subscription or of the last successful billing attempt. We
                  assume no liability for Service subscription error for the
                  wrong telephone, device or platform. We will not be liable for
                  any errors on billing statements issued to you by your
                  carrier. You reserve the right to remove, reclaim, or change
                  your account information within our service. You can either
                  email us on hello@selfjourney-et.com or call +251 911 520105
                  for any issues related to your account.
                </h1>

                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  Payment{" "}
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  Once you subscribe to our website or service, you will receive
                  a 3 days free trial to gain access to our platform and enjoy
                  the daily updated content, after which time we charge 2 birr
                  per day, your daily subscription to the Service will be
                  automatically renewed until you send an unsubscription
                  request. You can send an unsubscribe request by clicking the
                  "unsubscribe" link on the home page or sending “STOP” to 9876.
                  Your payment will be processed automatically through mobile
                  phone number balance and is the only payment method in
                  Service.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  5. MOBILE APPLICATION LICENSE{" "}
                </h1>

                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  Use License{" "}
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  If you access the Site via a mobile application, then we grant
                  you a revocable, non-exclusive, non-transferable, limited
                  right to install and use the mobile application on wireless
                  electronic devices owned or controlled by you, and to access
                  and use the mobile application on such devices strictly in
                  accordance with the terms and conditions of this mobile
                  application license contained in these Terms of Use. You shall
                  not: (1) except as permitted by applicable law, decompile,
                  reverse engineer, disassemble, attempt to derive the source
                  code of, or decrypt the application; (2) make any
                  modification, adaptation, improvement, enhancement,
                  translation, or derivative work from the application; (3)
                  violate any applicable laws, rules, or regulations in
                  connection with your access or use of the application; (4)
                  remove, alter, or obscure any proprietary notice (including
                  any notice of copyright or trademark) posted by us or the
                  licensors of the application; (5) use the application for any
                  revenue generating endeavor, commercial enterprise, or other
                  purpose for which it is not designed or intended; (6) make the
                  application available over a network or other environment
                  permitting access or use by multiple devices or users at the
                  same time; (7) use the application for creating a product,
                  service, or software that is, directly or indirectly,
                  competitive with or in any way a substitute for the
                  application; (8) use the application to send automated queries
                  to any website or to send any unsolicited commercial e-mail;
                  or (9) use any proprietary information or any of our
                  interfaces or our other intellectual property in the design,
                  development, manufacture, licensing, or distribution of any
                  applications, accessories, or devices for use with the
                  application.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  Apple and Android Devices{" "}
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  The following terms apply when you use a mobile application
                  obtained from either the Apple Store or Google Play (each an
                  “App Distributor”) to access the Site: (1) the license granted
                  to you for our mobile application is limited to a
                  non-transferable license to use the application on a device
                  that utilizes the Apple iOS or Android operating systems, as
                  applicable, and in accordance with the usage rules set forth
                  in the applicable App Distributor’s terms of service; (2) we
                  are responsible for providing any maintenance and support
                  services with respect to the mobile application as specified
                  in the terms and conditions of this mobile application license
                  contained in these Terms of Use or as otherwise required under
                  applicable law, and you acknowledge that each App Distributor
                  has no obligation whatsoever to furnish any maintenance and
                  support services with respect to the mobile application; (3)
                  in the event of any failure of the mobile application to
                  conform to any applicable warranty, you may notify the
                  applicable App Distributor, and the App Distributor, in
                  accordance with its terms and policies, may refund the
                  purchase price, if any, paid for the mobile application, and
                  to the maximum extent permitted by applicable law, the App
                  Distributor will have no other warranty obligation whatsoever
                  with respect to the mobile application; (4) you represent and
                  warrant that (i) you are not located in a country that is
                  subject to a U.S. government embargo, or that has been
                  designated by the U.S. government as a “terrorist supporting”
                  country and (ii) you are not listed on any U.S. government
                  list of prohibited or restricted parties; (5) you must comply
                  with applicable third-party terms of agreement when using the
                  mobile application, e.g., if you have a VoIP application, then
                  you must not be in violation of their wireless data service
                  agreement when using the mobile application; and (6) you
                  acknowledge and agree that the App Distributors are
                  third-party beneficiaries of the terms and conditions in this
                  mobile application license contained in these Terms of Use,
                  and that each App Distributor will have the right (and will be
                  deemed to have accepted the right) to enforce the terms and
                  conditions in this mobile application license contained in
                  these Terms of Use against you as a third-party beneficiary
                  thereof.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  6. SUBMISSIONS{" "}
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  You acknowledge and agree that any questions, comments,
                  suggestions, ideas, feedback, or other information regarding
                  the Site ("Submissions") provided by you to us are
                  non-confidential and shall become our sole property. We shall
                  own exclusive rights, including all intellectual property
                  rights, and shall be entitled to the unrestricted use and
                  dissemination of these Submissions for any lawful purpose,
                  commercial or otherwise, without acknowledgment or
                  compensation to you. You hereby waive all moral rights to any
                  such Submissions, and you hereby warrant that any such
                  Submissions are original with you or that you have the right
                  to submit such Submissions. You agree there shall be no
                  recourse against us for any alleged or actual infringement or
                  misappropriation of any proprietary right in your Submissions.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  7. SITE MANAGEMENT
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  We reserve the right, but not the obligation, to: (1) monitor
                  the Site for violations of these Terms of Use; (2) take
                  appropriate legal action against anyone who, in our sole
                  discretion, violates the law or these Terms of Use, including
                  without limitation, reporting such user to law enforcement
                  authorities; (3) in our sole discretion and without
                  limitation, refuse, restrict access to, limit the availability
                  of, or disable (to the extent technologically feasible) any of
                  your Contributions or any portion thereof; (4) in our sole
                  discretion and without limitation, notice, or liability, to
                  remove from the Site or otherwise disable all files and
                  content that are excessive in size or are in any way
                  burdensome to our systems; and (5) otherwise manage the Site
                  in a manner designed to protect our rights and property and to
                  facilitate the proper functioning of the Site.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  8. PRIVACY POLICY
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  We care about data privacy and security. By using the Site,
                  you agree to be bound by our Privacy Policy, which is
                  incorporated into these Terms of Use. Please be advised the
                  Site is hosted in Ethiopia. If you access the Site from any
                  other region of the world with laws or other requirements
                  governing personal data collection, use, or disclosure that
                  differ from applicable laws in Ethiopia, then through your
                  continued use of the Site, you are transferring your data to
                  Ethiopia, and you agree to have your data transferred to and
                  processed in Ethiopia.
                </h1>

                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  9. TERM AND TERMINATION
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  These Terms of Use shall remain in full force and effect while
                  you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF
                  THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE
                  DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND
                  USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO
                  ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT
                  LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR
                  COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE
                  LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION
                  IN THE SITE OR DELETE YOUR ACCOUNT AND ANY CONTENT OR
                  INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN
                  OUR SOLE DISCRETION. If we terminate or suspend your account
                  for any reason, you are prohibited from registering and
                  creating a new account under your name, a fake or borrowed
                  name, or the name of any third party, even if you may be
                  acting on behalf of the third party. In addition to
                  terminating or suspending your account, we reserve the right
                  to take appropriate legal action, including without limitation
                  pursuing civil, criminal, and injunctive redress.
                </h1>

                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  10. MODIFICATIONS AND INTERRUPTIONS
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  We reserve the right to change, modify, or remove the contents
                  of the Site at any time or for any reason at our sole
                  discretion without notice. However, we have no obligation to
                  update any information on our Site. We also reserve the right
                  to modify or discontinue all or part of the Site without
                  notice at any time. We will not be liable to you or any third
                  party for any modification, price change, suspension, or
                  discontinuance of the Site. We cannot guarantee the Site will
                  be available at all times. We may experience hardware,
                  software, or other problems or need to perform maintenance
                  related to the Site, resulting in interruptions, delays, or
                  errors. We reserve the right to change, revise, update,
                  suspend, discontinue, or otherwise modify the Site at any time
                  or for any reason without notice to you. You agree that we
                  have no liability whatsoever for any loss, damage, or
                  inconvenience caused by your inability to access or use the
                  Site during any downtime or discontinuance of the Site.
                  Nothing in these Terms of Use will be construed to obligate us
                  to maintain and support the Site or to supply any corrections,
                  updates, or releases in connection therewith.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  11. GOVERNING LAW{" "}
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  These Terms shall be governed by and defined following the
                  laws of Ethiopia. Jaktech Engineering and Trading and yourself
                  irrevocably consent that the courts of Ethiopia shall have
                  exclusive jurisdiction to resolve any dispute which may arise
                  in connection with these terms. Our failure to enforce any
                  right or provision of these Terms will not be considered a
                  waiver of those rights.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  12. DISPUTE RESOLUTION{" "}
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  You agree to irrevocably submit all disputes related to Terms
                  or the relationship established by this Agreement to the
                  jurisdiction of the Ethiopia courts. Jaktech Engineering and
                  Trading shall also maintain the right to bring proceedings as
                  to the substance of the matter in the courts of the country
                  where you reside or, if these Terms are entered into in the
                  course of your trade or profession, the state of your
                  principal place of business.
                </h1>

                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  13. CHANGES TO TERMS
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will try to provide at least 60 days notice prior to any new
                  terms taking effect. What constitutes a material change will
                  be determined at our sole discretion. By continuing to access
                  or use our Service after those revisions become effective, you
                  agree to be bound by the revised terms. If you do not agree to
                  the new terms, please stop using the Service.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  14. USER DATA
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will try to provide at least 60 days notice prior to any new
                  terms taking effect. What constitutes a material change will
                  be determined at our sole discretion. By continuing to access
                  or use our Service after those revisions become effective, you
                  agree to be bound by the revised terms. If you do not agree to
                  the new terms, please stop using the Service.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  15. CONTACT US{" "}
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  In order to resolve a complaint regarding the Site or to
                  receive further information regarding use of the Site, please
                  <br /> contact us at: Jaktech Engineering and Trading Gabon
                  Street, Jeme'a Building
                  <br />
                  7th Floor 702 Addis Ababa,
                  <br />
                  Addis Ababa Ethiopia
                  <br /> Phone:(+251)911520105
                  <br /> hello@selfjourney-et.com
                </h1>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
