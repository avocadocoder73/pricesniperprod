'use client'
import Peach from "../../images/peach"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useState } from "react"
import { BlogItems } from "../page"
import { LoadingSpinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"
import { Blog } from "../page"
import { Button } from "@/components/ui/button"
import Back from "@/app/images/back"
export default function BlogPage() {

    const [blogitems, setBlogItems] = useState<Blog[]>([]) 
    const [main, setMain] = useState<Blog>()

    useEffect(() => {
    
        (async() => {
            let blogid = window.location.href.toString().split('/blog/')[1]

            
            let resp = await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/fetchblogs", {method: "POST", body:blogid.toString()})

            if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
            }

            const data = await resp.json();

            setMain(data.blog)

        })()


    }, [])
    


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


    return main ? <div className='h-full w-full bg-[#fff8f8] '><div className='flex h-max items-center p-4'><Peach onClick={() => window.location.href = "/"} style={{marginRight: "3%", cursor:"pointer"}} className="w-[35px] md:w-[50px]"></Peach><div className='flex-row space-x-10'><Link className='text-xl font-SB text-[#fec5bb]' href={'/faq'}>FAQ</Link><Link className='text-xl font-SB text-[#fec5bb]' href={'/blog'}>Blog</Link></div></div>

<div className="w-full h-full flex flex-row">
    <div><Button>
        back
        </Button></div>
        <div className="h-full w-3/5 ml-[10vw]">
            <Card className="border-0 bg-[#fff8f8]">
                    <CardHeader className="w-full">
                            <img src={`https://d33mn5vlirq551.cloudfront.net/blog${main.blogid}.jpg`} className="w-full h-[25vw] border-black border-[2px] rounded-sm"></img>
                            <CardTitle className="font-SB">{main?.title}</CardTitle>
                            <div className="w-full flex flex-row justify-between items-center">
                            <div className="w-1/6 flex flex-row justify-between items-center">
                        <CardDescription className="text-black text-lg">{main?.time.split('.')[0]}</CardDescription>
                        <Separator className="w-2 bg-black"></Separator>
                        <CardDescription className="text-black text-lg">{new Date(parseInt(main?.date)).toLocaleString('en-US', {year: 'numeric',month: 'short',day: 'numeric',})}</CardDescription>
                    </div>
                    <div>{main?.author}</div>
                    </div>
                    
                    </CardHeader>
                    <CardContent className="font-MD text-xl">
                        <p>
                            {main.text}
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
                                author={item.author} 
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

    
    </div> : <LoadingSpinner></LoadingSpinner>
}