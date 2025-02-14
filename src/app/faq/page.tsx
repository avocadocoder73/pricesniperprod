'use client'
import Link from "next/link"
import Peach from "../images/peach"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Tiktok from "../images/tiktok"
import Instagram from "../images/instagram"
import Twitter from "../images/x"

import { useState } from 'react';

let list = [{title: "What is Peachy Prices", content: "PeachyPrices is a tool that helps you find cheaper options or alternatives for the products you love. Simply paste a link or photo of a product, and we’ll do the searching for you!"},
    {title: "How does it work?", content: "Using PeachyPrices is simple:\nCopy and paste a product link, Upload an image into the search bar, or search an item using.\nOur tool scans the web for cheaper prices or similar alternatives.\nCompare your options and choose the best deal!"},
    {title: "Is it free?", content: "Yes! PeachyPrices is completely free to use. Start saving without any hidden costs."},
    {title: "How can I contact support?", content: "If you have questions, suggestions, or need help, please contact us at support@peachyprices.com"},
    {title: "Is my personal information safe", content: "Absolutely. PeachyPrices does not store any of your personal information. For more details, please see our Privacy Policy."},
]


export default function FAQ()
{
    return (<div className="h-full"><div  className='flex h-max items-center p-4 border-b-[#fec5bb] border-b-2'><Link href={'/'} style={{marginRight: "3%"}}><Peach width={50}></Peach></Link><div className='flex items-center w-full flex-row space-x-10'><Link className='text-xl font-SB text-[#fec5bb]' href={'/faq'}>FAQ</Link><Link className='text-xl font-SB text-[#fec5bb]' href={'/blog'}>Blog</Link><div className='w-full flex flex-row items-center justify-center'>
        
        </div></div></div>
        <div style={{background: "#fff8f8", backgroundPosition: "bottom", // Ensures gradient starts at the bottom
    backgroundSize: "100% 100%",}} className="w-full flex justify-center min-h-screen">
        <Accordion type="single" collapsible>
            {list.map((item, index) => (<AccordionItem  className="w-[50vw] border-[0.25vw] border-black m-[3vw] p-[3vw] rounded-3xl flex flex-col justify-center text-center items-center" value={index.toString()}>
                <AccordionTrigger className="font-SB text-center text-lg text-black md:text-4xl pl-[3vw] pr-[3vw] ">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="font-MD text-xs text-black md:text-2xl ">
                    {item.content}
                </AccordionContent>
            </AccordionItem>))
                }
        </Accordion>

        
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
    </div>
        </div>)
}