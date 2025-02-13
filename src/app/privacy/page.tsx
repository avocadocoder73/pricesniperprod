'use client'
import Link from "next/link"
import Peach from "../images/peach"
import Twitter from "../images/x"
import Instagram from "../images/instagram"
import Tiktok from "../images/tiktok"



export default function Privacy()
{
    return(<div className='min-h-screen w-full bg-[#fff8f8] '><div className='flex h-max items-center p-4'><Peach onClick={() => window.location.href = "/"} style={{marginRight: "3%", cursor:"pointer"}} className="w-[35px] md:w-[50px]"></Peach><div className='flex-row space-x-10'><Link className='text-xl font-SB text-[#fec5bb]' href={'/faq'}>FAQ</Link><Link className='text-xl font-SB text-[#fec5bb]' href={'/blog'}>Blog</Link></div></div>
    <div className="flex flex-row justify-center mt-[3vw] mb-[2vw]">
        <div className="text-black font-SB text-lg text-center h-full w-1/2">
     <h1>Privacy Policy</h1>
    <p><strong>Last Updated: 2025-02-12</strong></p>

    <p>Welcome to Peachy Prices! Your privacy is important to us. This Privacy Policy explains how we handle information related to your use of <a href="https://www.peachyprices.com">www.peachyprices.com</a> (the "Website").</p>

    <h2>1. No Personal Data Collection</h2>
    <p>Peachy Prices does <strong>not</strong> collect, store, or process any personal data from users. Since we do not require user accounts, we do not gather names, email addresses, or any other personally identifiable information.</p>

    <h2>2. Cookies and Tracking</h2>
    <p>At this time, Peachy Prices does <strong>not</strong> use cookies, tracking pixels, or similar technologies to collect user data. However, third-party websites we link to may have their own tracking mechanisms, which are governed by their respective privacy policies.</p>

    <h2>3. Affiliate Links and Third-Party Websites</h2>
    <p>Peachy Prices participates in affiliate marketing programs, meaning we may earn commissions when users click on links to third-party websites and make purchases. These third-party sites may collect data according to their own policies, which we do not control. We encourage you to review their privacy policies before providing any personal information.</p>

    <h2>4. Data Security</h2>
    <p>Since we do not collect or store user data, there is no risk of your personal information being compromised on our Website. However, when visiting third-party websites, ensure you follow their security and privacy guidelines.</p>

    <h2>5. Children’s Privacy</h2>
    <p>Peachy Prices is not directed at children under the age of 13, and we do not knowingly collect any personal data from minors. If you believe a child has provided personal information on a third-party website linked from our Website, please contact that website directly.</p>

    <h2>6. Web Scraping and Automated Access</h2>
    <p>To protect the integrity of our Website, automated data collection, scraping, or unauthorized access to our content is strictly prohibited. We may take legal action against any entity or individual violating this policy.</p>

    <h2>7. Changes to This Privacy Policy</h2>
    <p>Since our services may evolve, we reserve the right to update this Privacy Policy at any time. Any changes will be reflected on this page with an updated effective date.</p>

    <h2>8. Contact Information</h2>
    <p>For any questions regarding this Privacy Policy, please contact us at:</p>
    <p><strong>Email:</strong> <a href="mailto:peachyprices@peachyprices.com">peachyprices@peachyprices.com</a></p>

    <p>By using Peachy Prices, you acknowledge that you have read, understood, and agreed to this Privacy Policy.</p>
</div>

</div>
                     <div className="h-[40vw] md:h-[10vw] pt-[3vw] pb-[2vw] items-center flex flex-col border-t-4 border-t-[#fec5bb] bg-[#fae1dd] text-black">
      <div className="flex flex-row items-center  justify-around w-full">
          <div className="flex flex-col md:flex-row justify-center items-center h-full w-1/3">
              <div className='text-[#fec5bb] text-2xl lg:text-4xl flex-wrap text-center font-SB italic'>Peachy</div>
            
            <div className='text-[#fec89a] text-2xl lg:text-4xl flex-wrap text-center font-SB italic'>Prices</div>
            </div>
            <div className="flex flex-col w-1/3 items-center">
            <div className="flex flex-col md:flex-row md:gap-x-5 items-center md:justify-around">
              <Link href={'/'}><div className="font-SB">Home</div></Link>
              <Link href={'/faq'}><div className="font-SB">FAQ</div></Link>                          
              <Link href={'/privacy'}><div className="font-SB">Privacy</div></Link>
              <Link href={'/terms'}><div className="font-SB">Terms</div></Link>
            </div>
              
            </div>
            <div className="flex flex-row md:gap-x-3 justify-center w-1/3">
            <Link target="_blank" href="https://www.tiktok.com/@peachypricesofficial"><Tiktok  width={25} height={25}></Tiktok></Link>
            <Link target="_blank"   href="https://x.com/PeachyPrices"><Twitter width={25} height={25}></Twitter></Link>
            <Link target="_blank"  href="https://www.instagram.com/peachypricesofficial/"><Instagram width={25} height={25}></Instagram></Link>
            </div>
            
        </div>
      <div className="w-full bg-[#fae1dd] font-SB flex flex-row justify-center">©2025 PeachyPrices</div>
    </div>
    
    </div>)
}