'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Form, FormControl } from '@/components/ui/form';
import Searching from './images/search'
import Clipboard from './images/clip'
import Instagram from "./images/instagram";
import Twitter from "./images/x";
import Tiktok from "./images/tiktok";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Peach from './images/peach'
import Link from 'next/link'
import Step from '@/components/custom/steps'
import Results from './images/step1'
import Bag from './images/bag'
import { LoadingSpinner } from "@/components/ui/spinner";
import { Image } from "lucide-react";
import { Search } from "lucide-react";
type Product = {
  companyimg: string
  companyname : string;
  img : string;
  price : string;
  productlink : string;
  title : string;
}

interface Affiliate {
  [key: string]: any;
}

export default function Home() {

  const router = useRouter()
  
  const [ld, setLD] = useState(false)
  const [o, setO] = useState(false)
  const [url, setURL] = useState('')
  const [tiktokURLdat, settiktokURL] = useState('')
  const [affil, setAffil] = useState<Record<string, any>>({})
  const [trending, setTrending] = useState<JSX.Element[]>([]) 

  useEffect(() => {


    
     fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/afil").then(async(res) => {
        let resp = await res.json()
        let keys = Object.keys(resp)
        
              const newAffil = Object.keys(resp).reduce((acc : any, key) => {
            acc[key] = resp[key];
            return acc;
          }, {});
          

          setAffil(newAffil)
            
        })
      fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/trending").then(async(res) => {
          let resp = await res.json()
          
          for (let i = 0; i < resp.length; i++)
          {
            let dat = resp[i].data.find((item : any) => item.img)
          
            
            setTrending((trending : any) => [...trending, <a href={`/search/${resp[i].id}`} target="_blank" rel="noopener noreferrer"><img style={{borderRadius:"10%"}} className="h-4/5 w-4/5 border-[0.2vw] border-[#fcd5ce]" src={dat.img} alt="Trending Item" /></a>]); 
            
          }
         
      })
     
  }, [])




  const callApi = async (event : any) => {
    
    
    setO(true)
    
    let payload = (await setImg(event)) as string
    try {

    
    
    if(tiktokURLdat.toLowerCase().includes("https://www.tiktok.com/"))
    {
      
      tiktokURL(tiktokURLdat)
     
      return
    }
    
    if (payload == null)
    {
      
      
     
      throw new Error("IMAGE NOT SET")
    }
    
    
    
    var data;
    
    await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/getproducts", {method:"POST", headers: { "Content-Type": "text/plain"}, body:payload}).then(async(res) => 
    {
      
       data = await res.text()
      const params = new URLSearchParams(JSON.stringify(data)).toString();
      
      
      
     
      
     
    }
    
    ).catch((err) => {console.log(err);
      
     })
    
    router.push(`/search/${data}`)

    
    return
    
    }
    catch(err) {
      setO(false)
      console.log(err)
    }
    finally {
      
    }
  }

  const setImg = (event : any) => {
    
    return new Promise((resolve, reject) => {
    const file = event.target.files[0];
    if (!file) {
      reject(new Error("No file selected"));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const base64 = reader.result.toString();
        resolve(base64); // Resolve the promise with the base64 string
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = () => reject(new Error("FileReader error"));
    reader.readAsDataURL(file);
  });
  };

  const tiktokURL = async(event : any) => {
    
    var data
    setLD(true)
    
    try {
    
    if(!event.includes("http"))
    {
      await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/shopping", {method: "POST", headers: { "Content-Type": "text/plain"}, body:event}).then(async (res) => {
        data = await res.text()
        
      })
      router.push(`/search/${data}`)
      return
    }
    
    await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/tiktoklink", {method:"POST", headers: { "Content-Type": "text/plain"}, body:event}).then(async(res) => 
    {
      
      data = await res.text()

      
      
//      const params = new URLSearchParams(JSON.stringify(data)).toString();
     
      
      
      /*
      data = data.filter((item) => (item as any).price != null ) as []

      data = data.filter((item) => (item as any).img != "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==") as []

      data = data.map(item => {
        let updatedItem = { ...item };
        for (const key in affil) {
            if (updatedItem.productlink.toLowerCase().includes(key)) {
                updatedItem.productlink = updatedItem.productlink + affil[key]
            }
        }
        return updatedItem;
        });

      const compressed = pako.deflate(JSON.stringify(data));

      let base64Encoded = Buffer.from(compressed).toString('base64')
      
      base64Encoded = base64Encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      */
      

      
      
      
     
      
    }
    
    ).catch((err) => {console.log(err); 
     })
    }
    catch(err)
    {

    }
    finally{
      
      setLD(false)
    }
      
    router.push(`/search/${data}`)
  }

//className="-ml-4 max-w-5xl flex flex-row mt-[3vw] justify-center"

  return (
    <div className='h-full w-full '>
   <div className='flex h-max items-center p-4'><Peach onClick={() => window.location.href = "/"} style={{marginRight: "3%", cursor:"pointer"}} className="w-[35px] md:w-[50px]"></Peach><div className='flex-row space-x-10'><Link className='text-xl font-SB text-[#fec5bb]' href={'/faq'}>FAQ</Link></div></div>
    <Card className='flex flex-col justify-center items-center bg-clear border-none shadow-none'>
        <CardHeader className='flex flex-row items-center'>
           <div className='text-[#fec5bb] text-3xl lg:text-6xl flex-wrap text-center font-SB italic'>Peachy</div>
            <Peach className="w-[100px] h-[40px] md:h-[50px]" style={{marginRight:"-12px"}}></Peach>
            <div className='text-[#fec89a] text-3xl lg:text-6xl flex-wrap text-center font-SB italic'>Prices</div>
        </CardHeader>
         <CardDescription className='text-[22px] text-[#a5c8b3] font-SB italic'>Your shortcut to savings</CardDescription>
         {!ld ? 
       <CardContent className='flex flex-col items-center w-full'>
        
        <div className='w-full flex flex-row items-center justify-center'>
        <form className="w-full flex flex-row items-center justify-center z-99" onSubmit={(e) => {
            e.preventDefault()
            tiktokURL(url)
  }}>
        
          <button 
            className="h-11 inline-flex items-center justify-center bg-[#fcd5ce] border-2 border-r-0 border-[#fec5bb] rounded-l-3xl mt-3" 
            // Match SVG size exactly
          >
            <Search size={30} className="stroke-white ml-2" />
          </button>
       
          <Input onChange={(e) => setURL(e.target.value)} className='bg-[#fcd5ce] mt-3 w-1/2 lg:w-2/6 h-11 rounded-none placeholder:text-white text-black font-SB text-[15px] placeholder:text-[17px] placeholder:font-MD border-t-2 border-b-2 border-l-0 border-r-0 border-[#fec5bb]' placeholder='Find cheaper prices'></Input>
         
          {o ? (<div className="stroke-white mt-3 pr-3 bg-[#fcd5ce] border-l-0 rounded-r-3xl border-2 border-[#fec5bb] h-11 flex items-center"><LoadingSpinner></LoadingSpinner></div> ) :  (<label htmlFor="imgupload">
            <Image  size={40} className="stroke-white mt-3 pr-3 bg-[#fcd5ce] border-l-0 rounded-r-3xl border-2 border-[#fec5bb] cursor-pointer h-11"></Image>
          </label>) }
          <Input onChange={(e) => callApi(e)}

             id="imgupload" type="file" className="hidden " ></Input> 
             </form>
        </div>
        
          <div onClick={() => document.getElementById("how")?.scrollIntoView({behavior: "smooth" })}  className='font-MD text-[13px] cursor-pointer  hover:text-[#fa9886]'>How it works</div>

       </CardContent> : <LoadingSpinner size={100}></LoadingSpinner>}

    </Card>
    <div className=''>
    <div className='bg-[#fa9886] border-[3px] border-[#FE8671] absolute w-[110vw] h-[100vh] inset-y-7/9 -translate-x-1/2 left-1/2 rounded-t-full mt-5 shadow-[0px_-4px_202px_20px_#fa9886]'>
    <div className='flex flex-col items-center overflow-x-hidden'>
          <div className='text-white font-SB text-5xl max-md:text-3xl mb-[3vw] max-sm:text-lg mt-[3.5vw]'>Trending Searches</div>
          <div className="w-[50vw] md:w-[45vw] flex flex-row mt-[-1vw] justify-center"> 
          <Carousel plugins={[ Autoplay({
          delay: 2500,
          
        }),]} opts={{
          loop: true
       
        
      }}>
            <CarouselContent>
              
          
          {trending.length > 0 ? (
            trending.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3"
              >
                {item}
              </CarouselItem>
              
            ))
          ) : (
            <div className="h-[15vw] w-[20vw] flex items-center justify-center"><LoadingSpinner className="h-[10vw] w-[10vw]"></LoadingSpinner></div>
          )}
           
            </CarouselContent>
              <CarouselPrevious className="border-white border-2" />
              <CarouselNext className="border-white border-2" />
          </Carousel>
          </div>
          
    </div>
    <div className="relative w-full flex justify-center overflow-hidden">
  <div className="w-[94.7vw] h-[0.1vw] bg-white shadow-[0px_0px_3px_1px_#ffffff]"
    >
</div>
    </div>   
    <div className='relative text-3xl w-full h-[2vw] text-white font-SB mt-[2vw] text-center'>How it works</div>
    <div id="how" className='flex flex-col md:space-x-3 w-full md:pb-[5vw] md:mt-[1vw] mt-[10vw] items-center md:justify-center md:flex-row bg-[#fa9886]'>
          <Step  img={<Clipboard className='h-[16vw]'></Clipboard>} header="1. Paste a product link" content="Found something you want to buy? Copy the link of the product and paste it into our search bar."></Step>
          <Step img={<Searching className='h-[16vw]'></Searching>} header="2. Let us do the searching" content="We'll instantly scan the web to find cheaper prices or similar alternatives for the product you love."></Step>
          <Step img={<Results className= 'w-[18vw] h-[16vw]' ></Results>} header="3. Compare your options" content="Review the results and choose the deal that works best for you. Saving money has never been this easy!"></Step>
          <Step  img={<Bag className='h-[16vw]'></Bag>} header="4. Shop smart" content="Click on your preferred deal and complete your purchase. More savings mean more shopping power for you!"></Step>
    </div>
    <div className="h-[40vw] md:h-[10vw] pt-[3vw] pb-[2vw] items-center flex flex-col border-t-4 border-t-[#fec5bb] bg-[#fae1dd] text-black">
      <div className="flex flex-row items-center  justify-around w-full">
          <div className="flex flex-col md:flex-row justify-center items-center h-full w-1/3">
              <div className='text-[#fec5bb] text-2xl lg:text-4xl flex-wrap text-center font-SB italic'>Peachy</div>
            
            <div className='text-[#fec89a] text-2xl lg:text-4xl flex-wrap text-center font-SB italic'>Prices</div>
            </div>
            <div className="flex flex-col items-center h-[5vw]">
            <div className="flex flex-col w-1/3 md:flex-row md:gap-x-5 items-center md:justify-around">
              <div className="font-SB">About</div>
              <div className="font-SB">Blog</div>
              <div className="font-SB">Contact</div>
              <div className="font-SB">Privacy</div>
              <div className="font-SB">Terms</div>
            </div>
              <div className="font-MD mt-[1vw] bg-[#fae1dd]">©2025 PeachyPrices</div>
            </div>
            <div className="flex flex-row md:gap-x-3 justify-center w-1/3">
            <Tiktok width={25} height={25}></Tiktok>
            <Twitter width={25} height={25}></Twitter>
            <Instagram width={25} height={25}></Instagram>
            </div>
            
        </div>
      
    </div>
    </div>
    </div> 
    
   </div>
   
  );
}
