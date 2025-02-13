'use client'
import Link from "next/link"
import Peach from "../images/peach"
import Twitter from "../images/x"
import Instagram from "../images/instagram"
import Tiktok from "../images/tiktok"



export default function Terms()
{
    return(<div className='min-h-screen w-full bg-[#fff8f8] '><div className='flex h-max items-center p-4'><Peach onClick={() => window.location.href = "/"} style={{marginRight: "3%", cursor:"pointer"}} className="w-[35px] md:w-[50px]"></Peach><div className='flex-row space-x-10'><Link className='text-xl font-SB text-[#fec5bb]' href={'/faq'}>FAQ</Link><Link className='text-xl font-SB text-[#fec5bb]' href={'/blog'}>Blog</Link></div></div>
    <div className="flex flex-row justify-center mt-[3vw] mb-[2vw]">
        <div className="text-black font-SB text-lg text-center h-full w-1/2">
    <p className="font-bold">Terms and Conditions</p>
    <p>Last Updated: 2025-02-12</p>
    <br />

    <p>Welcome to Peachy Prices! These Terms and Conditions govern your use of our website located at <a href="https://www.peachyprices.com" className="text-blue-500">www.peachyprices.com</a> (the "Website"). By accessing or using the Website, you agree to be bound by these Terms and Conditions.</p>
    <br />

    <p className="font-bold">1. General Information</p>
    <p>Peachy Prices is an individually run website that provides price comparisons and helps users find the cheapest prices for various products.</p>
    <p>We are not a registered company and operate independently.</p>
    <br />

    <p className="font-bold">2. No User Accounts</p>
    <p>We do not require or offer user accounts for accessing our Website.</p>
    <p>Since we do not collect personal information, there is no user registration or login process.</p>
    <br />

    <p className="font-bold">3. Affiliate Disclosure</p>
    <p>Peachy Prices participates in affiliate marketing programs, meaning we may earn commissions when users click on links to third-party websites and make purchases.</p>
    <p>Our recommendations and price comparisons are based on available data and are not influenced by our affiliate partnerships.</p>
    <br />

    <p className="font-bold">4. Price Accuracy Disclaimer</p>
    <p>We do our best to provide accurate and up-to-date pricing information; however, prices can change at any time without notice.</p>
    <p>We do not guarantee the accuracy, completeness, or reliability of the prices displayed on our Website.</p>
    <br />

    <p className="font-bold">5. Third-Party Transactions</p>
    <p>Peachy Prices does not sell products directly. Any purchase made through third-party websites is subject to their terms and policies.</p>
    <p>We are not responsible for the quality, shipping, refunds, or any issues related to transactions made on external websites.</p>
    <br />

    <p className="font-bold">6. Prohibited Activities</p>
    <p>Users may not use automated systems, bots, or scraping techniques to collect data from our Website.</p>
    <p>Any unauthorized use, including data mining, scraping, or reproducing content from our Website, is strictly prohibited and may result in legal action.</p>
    <br />

    <p className="font-bold">7. Limitation of Liability</p>
    <p>Peachy Prices is not liable for any direct, indirect, incidental, or consequential damages resulting from the use of our Website.</p>
    <p>We do not assume responsibility for any inaccuracies, errors, or interruptions in service.</p>
    <br />

    <p className="font-bold">8. Privacy Policy</p>
    <p>As of now, Peachy Prices does not collect or store user data. If this changes, our Privacy Policy will be updated accordingly.</p>
    <br />

    <p className="font-bold">9. Governing Law</p>
    <p>These Terms and Conditions are governed by and construed in accordance with the laws of the State of Illinois, without regard to its conflict of law principles.</p>
    <br />

    <p className="font-bold">10. Changes to These Terms</p>
    <p>We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on this page with an updated effective date.</p>
    <br />

    <p className="font-bold">11. Contact Information</p>
    <p>For any questions regarding these Terms and Conditions, please contact us at <a href="mailto:peachyprices@peachyprices.com" className="text-blue-500">peachyprices@peachyprices.com</a>.</p>
    <br />

    <p>By using Peachy Prices, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
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