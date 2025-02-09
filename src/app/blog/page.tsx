'use client'
import Peach from "../images/peach"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { LoadingSpinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"


export type Blog = {
    author : String,
    blogid : String,
    date : string,
    text : String,
    time : String,
    title : String
}


function BlogItems({title, date, blogid, time }: {title: any; date: any, blogid: any, time: any})
{
    


    return (
        <Link href={`/blog/${blogid}`}>
        <Card className="w-full">
            <CardHeader className="flex-row flex">
                    <img src={`https://d33mn5vlirq551.cloudfront.net/blog${blogid}.jpg`} className="w-1/2 h-[10vw] border-black border-[2px] rounded-md"></img>
                    <div className="w-1/3 ml-[1vw] flex flex-col">
                    <div className="w-full flex flex-row justify-between items-center">
                        <CardDescription className="text-black text-lg">{time.split('.')[0]}</CardDescription>
                        <Separator className="w-2 bg-black"></Separator>
                        <CardDescription className="text-black text-lg">{new Date(parseInt(date)).toLocaleString('en-US', {year: 'numeric',month: 'short',day: 'numeric',})}</CardDescription>
                    </div>
                        <CardTitle>{title}</CardTitle>
                    </div>
            </CardHeader>
            
        </Card>
        </Link>
    )

}


export default function Blog() {

    const [blogitems, setBlogItems] = useState<Blog[]>([]) 



    useEffect(() => {

       (async () => {
    try {
        const resp = await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/blogposts", { method: "GET" });
        
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }

        const data = await resp.json();
        setBlogItems(data)
    } catch (err) {
        console.error("Fetch error:", err);
    }
        })();


    }, [])

useEffect(() => {
    console.log(blogitems);
}, [blogitems]);



    return (<div className='h-full w-full bg-[#fff8f8] '><div className='flex h-max items-center p-4'><Peach onClick={() => window.location.href = "/"} style={{marginRight: "3%", cursor:"pointer"}} className="w-[35px] md:w-[50px]"></Peach><div className='flex-row space-x-10'><Link className='text-xl font-SB text-[#fec5bb]' href={'/faq'}>FAQ</Link><Link className='text-xl font-SB text-[#fec5bb]' href={'/blog'}>Blog</Link></div></div>

<div className="w-full h-full flex flex-row">
        <div className="h-full w-3/5 ml-[10vw]">
            <Card className="border-0 bg-[#fff8f8]">
                    <CardHeader className="w-full">
                            <img src="/BLOG_picture.png" className="w-full h-[25vw] border-black border-[2px] rounded-sm"></img>
                            <CardTitle className="font-SB">PeachyPrices Blog</CardTitle>
                            <CardDescription className="font-MD text-lg">Your Shortcut to Smarter Shopping</CardDescription>
                    </CardHeader>
                    <CardContent className="font-MD text-xl">
                        <p>
                              Welcome to the PeachyPrices Blog, where we help you shop smarter and save more! Whether you're looking for budget-friendly alternatives to luxury brands, insider shopping tips, or the best price comparison hacks, we've got you covered.
                        </p>
                        <br>
                        </br>
                        <p>
                                        Our blog is designed to help you find the best deals, uncover hidden savings, and stay updated on the latest shopping trends—all while making the most of our powerful PeachyPrices search tool.
                        </p>
                    </CardContent>
            </Card>
        </div>
        <div className="flex flex-col items-center h-full w-2/5 ml-[1vw]">
            <Card className="w-full flex flex-col justify-center rounded-3xl items-center">
                <CardHeader>
                    <CardTitle>Latest</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                    {blogitems.length > 0 ? (
                        blogitems.map((item, index) => (
                            <BlogItems 
                                key={index} 
                                time={item.time} 
                                title={item.title}                                
                                blogid={item.blogid} 
                                date={item.date} 
                            />
                        ))
                    ) : (
                        <div className="w-full flex flex-row justify-center">
                        <LoadingSpinner size={40} />
                        </div>
                    )}


                </CardContent>
            </Card>
        </div>


    </div>

    
    </div>)
}