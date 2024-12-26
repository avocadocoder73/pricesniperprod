'use client'
import Image from 'next/image'
import img from './images/agent.png'
import prev from './images/preview.png'
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
  
  
  const [o, setO] = useState(false)
  const [error, setError] = useState(false)
  const [errormsg, setErrorMsg] = useState('')
  const [image, setImage] = useState<string | null>(null);
  const [tiktokURLdat, settiktokURL] = useState('')
  const [affil, setAffil] = useState<Record<string, any>>({})


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
      
     
  }, [])

  const callApi = (event : any) => {
    setError(false)
    setO(true)
    event.preventDefault()
    if(tiktokURLdat.toLowerCase().includes("https://www.tiktok.com/"))
    {
      tiktokURL(tiktokURLdat)
      setO(true)
      return
    }
    
    if (image == null)
    {
      setError(true)
      setErrorMsg("Image not set for search")
      setO(false)
      return
    }
    
    event.preventDefault()
    let payload = image

    fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/getproducts", {method:"POST", headers: { "Content-Type": "text/plain"}, body:payload}).then(async(res) => 
    {
      
      let data = await res.text()
//      const params = new URLSearchParams(JSON.stringify(data)).toString();

      
      /*
      data = data.filter((item) => (item as any).price != null ) as []

      data = data.filter((item) => (item as any).img != "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==") as []

      data = data.filter((item) => (item as any).price.includes("$")) as []

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
      
     router.push(`/search/${data}`)
      
     setO(false)
    }
    
    ).catch((err) => {console.log(err); setError(true);
      setErrorMsg("Failed to fetch products. Check console for more")})
  
  }

  const setImg = (event : any) => {

    const file = event.target.files[0]  
     if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const base64 = reader.result.toString(); 
          setImage(base64);
          
        }
      };
      reader.readAsDataURL(file); 
    }
  };

  const tiktokURL = (event : any) => {
    
    
    fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/tiktoklink", {method:"POST", headers: { "Content-Type": "text/plain"}, body:event}).then(async(res) => 
    {
      
      let data = await res.text()

      console.log(data)
      
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

      

      router.push(`/search/${data}`)
      
     setO(false)
      
    }
    
    ).catch((err) => {console.log(err); setError(true);
      setErrorMsg("Failed to fetch products. Check console for more")})
  
  

  }



  return (
    <div className='h-full'>
   <div className='flex flex-row h-max border-b-[#334155] border-b-2 items-center p-4'><Image height={50} width={50} alt="/agent.png" src={img}></Image><p className='text-2xl text-white ml-3'>PandaLookup</p></div>
    <Card className='flex flex-col justify-center items-center bg-clear border-none'>
        <CardHeader className='flex flex-col items-center'>
           <CardTitle className='text-white text-6xl w-500px h-50 flex-wrap text-center pb-10'>Savings are just a click away</CardTitle>
           <CardDescription className='text-lg text-[#A3A3A3]'>Just upload an image of a product or type a TikTok shop link and let us do the rest!</CardDescription>
        </CardHeader>
       <CardContent className='flex flex-col items-center'>
        {error ? <Card className='bg-[#ab4b4b] mb-5 flex items-center flex-col h-11 border-red-600'><CardContent className='font-SatoshiBold text-white mt-1.5'>{errormsg}</CardContent></Card> : ''}
          { o ? <div className="lds-dual-ring"></div>  : <Label htmlFor='fileinput' className='cursor-pointer flex flex-row justify-center items-center bg-white p-3 rounded-lg'>
            
            
             <Upload className='bg-white cursor-pointer'></Upload>Upload Image</Label> }
         {o ? "": <form className='flex flex-col items-center' onSubmit={callApi}>
          
              <div className='flex flex-col items-center'>
                
                
                <Input  onChange={setImg} id='fileinput' accept="image/png, image/jpeg, image/jpg" className='bg-white hidden' placeholder='Upload' type='file'></Input>
            <p className='text-white mt-5 mb-5'>Or</p>
            <Input onChange={(e) => settiktokURL(e.target.value)}  placeholder='TikTok Shop URL' className='bg-white'></Input>

            <Button variant="outline" type='submit' className='mt-8 bg-white text-black text-center'>Search for Deals</Button></div>
              
             
          </form> }
          <Image style={{width:"50%", border:"1px solid white", marginTop:"3%", borderRadius:"10px"}} alt="/preview.png" src={prev}>
          </Image> 
       </CardContent>

    </Card>
    <div className='mt-32 border-t-2 flex flex-col items-center'><h1 className='mt-24 text-l text-gray-600'>Affiliate Disclosure:</h1><p className='text-sm text-gray-600  w-5/6 text-wrap text-center'>

This website is dedicated to finding the cheapest prices for products across various websites. Some of the links provided are affiliate links, meaning I may earn a small commission if you click on them and make a purchase, at no extra cost to you. These commissions help support the operation of the site, allowing us to continue offering this service. Rest assured, the recommendations are based solely on price and product availability, not on affiliate relationships.

Thank you for your support!</p></div>
   </div>
  );
}
