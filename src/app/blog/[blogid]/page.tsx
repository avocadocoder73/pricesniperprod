'use client'
import Peach from "../../images/peach"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useState } from "react"
import { LoadingSpinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"
import { Blog } from "../page"
import { Button } from "@/components/ui/button"




function BlogItems({title, date, blogid, time }: {title: any; date: any, blogid: any, time: any, author: any })
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
    

   

const processText = (text: any) => {
  const paragraphs = text.split("\n\n"); // Split text into sections
  let isFirstLine = true; // Track if it's the first line of the entire text

  return paragraphs.map((paragraph: any, index: any) => {
    const lines = paragraph.split("\n"); // Split by line
    let formattedLines = [];

      


    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      const linkMatch = line.match(/(.+?)\((https?:\/\/[^\s]+|www\.[^\s]+|bit\.ly\/[^\s]+|tinyurl\.com\/[^\s]+|amzn\.to\/[^\s]+)\)/i);


      // If this is the very first line of the entire text, make it bold
      if (isFirstLine) {
        formattedLines.push(
          <span key={`${index}-${i}`} className="block font-bold text-lg">
            {line}
          </span>
        );
        isFirstLine = false;
      } 
      // If a separator (___) is found, make the next line bold
      else if (line.startsWith("___")) {
        formattedLines.push(
          <div>
          <Separator className="bg-black mt-5 mb-5 h-0.5 "></Separator>
          <span key={`${index}-${i}`} className="block font-bold text-lg">
            {lines[i + 1]}
          </span>
          </div>
        );
        i++; // Skip the next line since it's already processed
      } 
     else if (linkMatch) {
         const textWithoutLink = linkMatch[1].trim(); // Remove the URL part
        const url = linkMatch[2]; // Extract the URL

        formattedLines.push(
          <Link 
            key={`${index}-${i}`} 
            href={url} 
            target="_blank" 
            className="block text-blue-500 underline"
          >
            {textWithoutLink} {/* Text without the link in parentheses */}
          </Link>
        );
      } 
      
      // Convert links into anchor tags
      else {
        // Regex to detect links in the text
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        const parts = line.split(linkRegex);

        formattedLines.push(
          <span key={`${index}-${i}`} className="block">
            {parts.map((part : any, idx : any) => 
              linkRegex.test(part) ? (
                <Link key={idx} href={part} target="_blank" className="text-blue-500 underline">
                  {part}
                </Link>
              ) : (
                part
              )
            )}
          </span>
        );
      }
    }

    return (
      <p key={index} className="mb-4">
        {formattedLines}
      </p>
    );
  });
};

  


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

//.toLocaleString('en-US', {year: 'numeric',month: 'short',day: 'numeric',})
    return (<div className='h-full w-full bg-[#fff8f8] '><div className='flex h-max items-center p-4'><Peach onClick={() => window.location.href = "/"} style={{marginRight: "3%", cursor:"pointer"}} className="w-[35px] md:w-[50px]"></Peach><div className='flex-row space-x-10'><Link className='text-xl font-SB text-[#fec5bb]' href={'/faq'}>FAQ</Link><Link className='text-xl font-SB text-[#fec5bb]' href={'/blog'}>Blog</Link></div></div>

{main ? <div className="w-full h-full flex flex-col items-center lg:flex-row">
    
        <div className="h-full w-full md:w-3/5 md:ml-[10vw]">
            <Card className="border-0 bg-[#fff8f8]">
                    <CardHeader className="w-full">
                            <img src={`https://d33mn5vlirq551.cloudfront.net/blog${main.blogid}.jpg`} className="w-full h-[50vw] md:h-[25vw] border-black border-[2px] rounded-sm"></img>
                            <CardTitle className="font-SB">{main?.title}</CardTitle>
                            <div className="w-full flex flex-row justify-between items-center">
                            <div className="w-3/6 xl:w-2/6 2xl:w-1/6 flex flex-row justify-between items-center">
                        <CardDescription className="text-black text-lg">{main?.time.split('.')[0]}</CardDescription>
                        <Separator className="w-2 bg-black"></Separator>
                        <CardDescription className="text-black text-lg">{new Date(parseInt(main?.date) * 1000).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric"})}</CardDescription>
                    </div>
                    
                    </div>
                    <div>{main?.author}</div>
                    </CardHeader>
                    <CardContent className="font-MD text-xl">
                        <pre className="font-MD text-wrap">
                            {processText(main.text)}
                        </pre>
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


    </div> : <LoadingSpinner size={50} color="black"></LoadingSpinner>}

    
    </div> )
}
    