import Link from "next/link"
import Tiktok from "@/app/images/tiktok"
import Instagram from "@/app/images/instagram"
import Twitter from "@/app/images/x"





export default function Footer ()
{
    return (<div className="h-[40vw] md:h-[10vw] pt-[3vw] pb-[2vw] items-center flex flex-col border-t-4 border-t-[#fec5bb] bg-[#fae1dd] text-black">
      <div className="flex flex-row items-center  justify-around w-full">
          <div className="flex flex-col md:flex-row justify-center items-center h-full w-1/3">
              <div className='text-[#fec5bb] text-2xl lg:text-4xl flex-wrap text-center font-SB italic'>Peachy</div>
            
            <div className='text-[#fec89a] text-2xl lg:text-4xl flex-wrap text-center font-SB italic'>Prices</div>
            </div>
            <div className="flex flex-col w-1/3 items-center">
            <div className="flex flex-col md:flex-row md:gap-x-5 items-center md:justify-around">
              <Link href={'/faq'}><div className="font-SB">FAQ</div></Link>
              <Link href={'/blog'}><div className="font-SB">Blog</div></Link>            
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
    </div>)
}