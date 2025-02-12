'use client'

import img from '../../images/agent.png'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/app/websites/data-table'
import {columns} from '@/app/websites/columns'
import { useEffect, useState } from 'react'
import Peach from '@/app/images/peach'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Image } from "lucide-react";
import { Search } from "lucide-react";
import { LoadingSpinner } from '@/components/ui/spinner'
type Product = {
  companyimg: string
  companyname : string;
  img : string;
  price : string;
  productlink : string;
  title : string;
}

export default function SearchStuff()
{
    const router = useRouter()

    const [data, setData] = useState([])

    const [affil, setAffil] = useState<Record<string, any>>({})
    const [ld, setLD] = useState(false)
    const [o, setO] = useState(false)
    const [error, setError] = useState(false)
    const [errormsg, setErrorMsg] = useState('')
    const [url, setURL] = useState('')
    const [image, setImage] = useState<string | null>(null);
    const [tiktokURLdat, settiktokURL] = useState('')
    const [trending, setTrending] = useState([]) 
    interface Affiliate {
        [key: string]: any;
    }

    useEffect(() => {

        const fetchData = async() =>
            {

            

        const res1 = await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/afil");
        const resp = await res1.json();

      // Process the affiliate data
      const newAffil = Object.keys(resp).reduce((acc: any, key) => {
        acc[key] = resp[key];
        return acc;
      }, {});

        setAffil(newAffil);

        console.log(affil)
       

      
    }
    fetchData()
    
    }, [])

    useEffect(() => {

        let url = window.location.href

       let base64String = url.split("/")[4]

          fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/getiddata", {method:"POST", headers: { "Content-Type": "text/plain"}, body:base64String}).then(async(res) => {

            let data = await res.json()
            console.log(data)
            data = data.filter((item : Product) => (item).price != null ) as []

            data = data.filter((item : Product) => (item).img != "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==") as []

            data = data.filter((item : Product) => (item).price.includes("$")) as []

            data = data.filter((item : Product) => (item).img != null) as []
            
            data = data.map((item : Product) => {
                let updatedItem = { ...item };
                for (const key in affil) {
                   
                    if (updatedItem.productlink.toLowerCase().includes(key)) {
                        updatedItem.productlink = updatedItem.productlink + affil[key] 
                    }
                }
                return updatedItem;
                });
            console.log(data)
            data = data.map((item : any) => ({
              ...item,
              price: item.price // Extracts only the first price
            }));

            setData(data)
            
        }).catch((err) => console.log(err))

    }, [affil])


    const callApi = async (event : any) => {
    
    setError(false)
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
//      const params = new URLSearchParams(JSON.stringify(data)).toString();
      console.log(data)
      
      
     
      
     
    }
    
    ).catch((err) => {console.log(err); setError(true);
      setErrorMsg("Failed to fetch products. Check console for more")})
    console.log(data)
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
    
    var data = ''
    
    try {
    
     if(event.includes("amzn") || event.includes("amazon") || event.includes("a.co"))
    {
      await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/amazongrab", {method: "POST", body:event}).then(async(res) => {
        data = await res.text() as string

      })
      router.push(`/search/${data ? data.replace(/['"]/g, '') : "error"}`)

      return
    }
    
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
      
     
    }
      
    router.push(`/search/${data}`)
  }

    //   <DataTable columns={columns} data={}></DataTable>
//"linear-gradient(to top, #fa9886, #ffe4e1)"
    return(<div  style={{background: "linear-gradient(to top, #fa9886 60%, #ffe4e1)"}}><div  className='flex h-max items-center p-4'><Link href={'/'} style={{marginRight: "3%"}}><Peach className="w-[35px] md:w-[50px]"></Peach></Link><div className='flex items-center w-full flex-row space-x-4'> <div className='w-full flex flex-row items-center justify-center'>
      <form className="w-full flex flex-row items-center justify-center" onSubmit={(e) => {
            e.preventDefault()
            tiktokURL(url)
  }}>
         {!ld ? <button 
            className="h-11 inline-flex items-center justify-center bg-[#fcd5ce] border-2 border-r-0 border-[#fec5bb] rounded-l-3xl mt-3" 
            // Match SVG size exactly
          >
            <Search size={30} className="stroke-white ml-2" />
          </button> : <div className='h-11 inline-flex items-center justify-center bg-[#fcd5ce] border-2 border-r-0 border-[#fec5bb] rounded-l-3xl mt-3'><LoadingSpinner className='stroke-black' ></LoadingSpinner></div>}
          <Input onChange={(e) => setURL(e.target.value)} className='bg-[#fcd5ce] mt-3 w-auto h-11 md:w-2/3 rounded-none placeholder:font-MD font-MD text-black placeholder:text-white border-t-2 border-b-2 border-l-0 border-r-0 border-[#fec5bb]' placeholder='Find cheaper prices'></Input>
          
          {o ? (<div className="stroke-white mt-3 pr-3 bg-[#fcd5ce] border-l-0 rounded-r-3xl border-2 border-[#fec5bb] h-11 flex items-center"><LoadingSpinner></LoadingSpinner></div> ) :  (<label htmlFor="imgupload">
                      <Image  size={40} className="stroke-white mt-3 pr-3 bg-[#fcd5ce] border-l-0 rounded-r-3xl border-2 border-[#fec5bb] h-11"></Image>
                    </label>) }
          <Input onChange={(e) => {try {          
            callApi(e);
          }
          catch(err)
          {
            console.log(err)
          }

            }} id="imgupload" type="file" className="hidden"></Input>
            </form>
        </div></div></div>
    <DataTable columns={columns} data={data}></DataTable>
 
    </div>)
}