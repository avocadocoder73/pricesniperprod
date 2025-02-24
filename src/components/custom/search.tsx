'use client'
import { useState } from "react"
import { Image } from "lucide-react";
import { Input } from '@/components/ui/input';
import { CardContent } from "../ui/card";
import { LoadingSpinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar()
{


    const [url, setURL] = useState('')
    const [tiktokURLdat, settiktokURL] = useState('')
    
    const router = useRouter()

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
    var item : any
    await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/getproducts", {method:"POST", headers: { "Content-Type": "text/plain"}, body:payload}).then(async(res) => 
    {
      
       data = await res.text()
     
       item = await JSON.parse(data)
      
     

      localStorage.setItem("searchimage", item.searchIMG)
     
      
     
    }
    
    ).catch((err) => {console.log(err);
      
     })
    
    router.push(`/search/${item.item}`)

    
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
    let parseddata: Record<string, any> = {}   
    setLD(true)
    
    try {

    if(event.includes("amzn") || event.includes("amazon") || event.includes("a.co"))
    {
      await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/amazongrab", {method: "POST", body:event}).then(async(res) => {
        data = await res.text() as string
        
        parseddata = JSON.parse(data)
        
        localStorage.setItem("searchimage", parseddata.searchIMG)
      })
      router.push(`/search/${parseddata.item}`)
      
      //router.push(`/search/${data ? data.replace(/['"]/g, '') : "error"}`)

      return
    }
    
    if(!event.includes("http"))
    {
      await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/shopping", {method: "POST", headers: { "Content-Type": "text/plain"}, body:event}).then(async (res) => {
        data = await res.text()
        
        localStorage.setItem("searchimage", "")
      })
      router.push(`/search/${data}`)
      return
    }

     if(!event.includes("tiktok") && event.incldes)
    {
      console.log("HERE")
        await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/omni", {method: "POST", headers: { "Content-Type": "text/plain"}, body:event}).then(async (res) => {
        data = await res.text()
        
        parseddata = JSON.parse(data)

      localStorage.setItem("searchimage", parseddata.searchIMG)

      })
      router.push(`/search/${parseddata.item}`)
      return
    }
    
    await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/tiktoklink", {method:"POST", headers: { "Content-Type": "text/plain"}, body:event}).then(async(res) => 
    {
      
      data = await res.text()

      
      parseddata = JSON.parse(data)

      localStorage.setItem("searchimage", parseddata.searchIMG)
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
      
   router.push(`/search/${parseddata.item}`)
  }




    const [ld, setLD] = useState(false)
    const [o, setO] = useState(false)

    return( 
        <div className="w-full">
       <div className="w-full flex flex-row items-center justify-center">
    <form 
      className="w-full flex flex-row items-center justify-center z-50" 
      onSubmit={(e) => {
        e.preventDefault();
        tiktokURL(url);
      }}
    >
      {/* Search Button */}
      <button 
        className="h-11 inline-flex items-center justify-center bg-[#fcd5ce] border-2 border-r-0 border-[#fec5bb] rounded-l-3xl mt-3"
      >
        {!ld ? <Search size={30} className="stroke-white ml-2" /> : <LoadingSpinner className="ml-2" color="black"></LoadingSpinner>}
      </button>

      {/* Input Field */}
      <Input 
        onChange={(e) => setURL(e.target.value)} 
        className="bg-[#fcd5ce] mt-3 w-1/2 lg:w-2/6 h-11 rounded-none placeholder:text-white text-black font-SB text-[15px] placeholder:text-[17px] placeholder:font-MD border-t-2 border-b-2 border-l-0 border-r-0 border-[#fec5bb]" 
        placeholder="Find cheaper prices"
      />

      {/* Loader or Image Upload */}
      {o ? (
        <div className="stroke-white mt-3 pr-3 bg-[#fcd5ce] border-l-0 rounded-r-3xl border-2 border-[#fec5bb] h-11 flex items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <label htmlFor="imgupload">
          <Image 
            size={40} 
            className="stroke-white mt-3 pr-3 bg-[#fcd5ce] border-l-0 rounded-r-3xl border-2 border-[#fec5bb] cursor-pointer h-11"
           
          />
        </label>
      )}

      {/* Hidden File Input */}
      <Input 
        onChange={(e) => callApi(e)} 
        id="imgupload" 
        type="file" 
        className="hidden" 
      />
    </form>
  
</div>

{/* How It Works Button */}


       </div>)
}