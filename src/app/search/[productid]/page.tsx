'use client'
import Image from 'next/image'
import img from '../../images/agent.png'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/app/websites/data-table'
import {columns} from '@/app/websites/columns'
import { useEffect, useState } from 'react'
import pako from 'pako'

type Product = {
  companyimg: string
  companyname : string;
  img : string;
  price : string;
  productlink : string;
  title : string;
}

export default function Search()
{
    const router = useRouter()

    const [data, setData] = useState([])

    const [affil, setAffil] = useState<Record<string, any>>({})
    

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
            console.log(res)
            data = data.filter((item : Product) => (item).price != null ) as []

            data = data.filter((item : Product) => (item).img != "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==") as []

            data = data.filter((item : Product) => (item).price.includes("$")) as []

            
            data = data.map((item : Product) => {
                let updatedItem = { ...item };
                for (const key in affil) {
                   
                    if (updatedItem.productlink.toLowerCase().includes(key)) {
                        updatedItem.productlink = updatedItem.productlink + affil[key] 
                    }
                }
                return updatedItem;
                });
            
            

            setData(data)
            
        }).catch((err) => console.log(err))

    }, [affil])

    //   <DataTable columns={columns} data={}></DataTable>

    return(<div><div className='flex flex-row h-max border-b-[#334155] border-b-2 items-center p-4'><Image onClick={() => router.push('/')} height={50} width={50} alt="/agent.png" src={img} style={{cursor:'pointer'}}></Image><p onClick={() => router.push('/')} className='text-2xl text-white ml-3 cursor-pointer'>PandaLookup</p></div>
    <DataTable columns={columns} data={data}></DataTable>
 
    </div>)
}