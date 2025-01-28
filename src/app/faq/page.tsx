'use client'
import Link from "next/link"
import Peach from "../images/peach"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { useState } from 'react';

let list = [{title: "What is Peachy Prices", content: "PeachyPrices is a tool that helps you find cheaper options or alternatives for the products you love. Simply paste a link or photo of a product, and we’ll do the searching for you!"},
    {title: "How does it work?", content: "Using PeachyPrices is simple:\nCopy and paste a product link or image into the search bar.\nOur tool scans the web for cheaper prices or similar alternatives.\nCompare your options and choose the best deal!"},
    {title: "Is it free?", content: "Yes! PeachyPrices is completely free to use. Start saving without any hidden costs."},
    {title: "How can I contact support?", content: "If you have questions, suggestions, or need help, please contact us at support@peachyprices.com"},
    {title: "Is my personal information safe", content: "Absolutely. PeachyPrices does not store any of your personal information. For more details, please see our Privacy Policy."},
]


export default function FAQ()
{
    return (<div className="h-full bg-[#ffe4e1]"><div  className='flex h-max items-center p-4'><Link href={'/'} style={{marginRight: "3%"}}><Peach width={50}></Peach></Link><div className='flex items-center w-full flex-row space-x-8'><Link className='text-xl font-SB text-[#fec5bb]' href={'/faq'}>FAQ</Link><div className='w-full flex flex-row items-center justify-center'>
        
        </div></div></div>
        <div style={{background: "linear-gradient(to top, #fa9886 5%, #ffe4e1)", backgroundPosition: "bottom", // Ensures gradient starts at the bottom
    backgroundSize: "100% 100%",}} className="w-full flex justify-center min-h-screen">
        <Accordion type="single" collapsible>
            {list.map((item, index) => (<AccordionItem  className="w-[50vw] border-[0.25vw] border-[#f48889] m-[3vw] p-[3vw] rounded-3xl flex flex-col justify-center text-center items-center" value={index.toString()}>
                <AccordionTrigger className="font-SB text-center text-lg md:text-4xl pl-[3vw] pr-[3vw] ">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="font-MD text-xs md:text-2xl ">
                    {item.content}
                </AccordionContent>
            </AccordionItem>))
                }
        </Accordion>
        </div>
        </div>)
}