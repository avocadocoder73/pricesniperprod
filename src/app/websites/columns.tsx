import { ColumnDef } from "@tanstack/react-table"
import Zoom from 'react-medium-image-zoom'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import '../../app/globals.css'


export type Entry = {
    companyname? : String,
    title? : String
    img? : HTMLImageElement,
    price? : String
    productlink? : String,
    companyimg? : String

}


export const columns : ColumnDef<Entry>[] = [
     {
        accessorKey: "img",
        header: "",
        cell: (props) => {
             const imgUrl = (props.getValue() as string)
             
            return(
                
            <img
                src={imgUrl}
                alt="Image description"
                className="w-full h-full object-contain"
                
                />)
        }
    },
    {
        accessorKey: "companyname",        
        header: ({column}) => {

            return (
                   <Button
                    className="text-white bg-[#f48889] ml-0 md:text-lg  text-xs"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Company
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
            )

        },
        cell: ({row}) => {
            
            let data = row.original.companyname
            
            let companyimg = row.original.companyimg as string

            return(
                <div className="flex flex-row items-center"><img className="pr-[0.2vw]  md:w-auto" src={companyimg}></img><p className="font-['SatoshiMed'] text-xs md:text-xl" >{data}</p></div>
            )
        }
    },
    {
        accessorKey: "title",
        header: "",
        cell: ({row}) => {
            
            const data = row.original.title
            
            return(
                <p className="font-['SatoshiMed'] text-xs md:text-4xl">{data}</p>
            )
        }
    },
    {
        accessorKey: "price",
        header: ({column}) => {

            return (
                   <Button
                   className="text-white bg-[#f48889] md:text-lg  text-xs"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
            )

        },
        cell: ({row}) => {

            let dat = row.original.price as string

            let url = row.original.productlink as string
            
            const start = dat?.indexOf('$')
            const end = dat?.indexOf('*')
            if(start && end && dat)
            {            
                dat = dat.substr(start, end - start)
            }

           

            //<Link className="font-['SatoshiMed']" style={{height:"100px", width:"100px"}} href={url}>{url}</Link>

            return (
            <div className="flex flex-row justify-between h-full items-end"><p className="font-['SatoshiMed'] ml-[0.2vw] md:text-5xl underline italic font-bold text-xs leading-none">{dat}</p>
            <Button  className="bg-[#f48889] font-SB border-white border-2 md:h-[3.1rem] text-[2vw] md:text-3xl " asChild>
                <Link href={url}>View</Link>
            </Button>
            
            </div>
            )
        },
        sortingFn: (rowA, rowB, columnId) => {
            // Strip the $ sign and convert to a float for comparison
            const priceA = parseFloat((rowA.getValue(columnId) as any ).replace(/\$/, ""));
            const priceB = parseFloat((rowB.getValue(columnId) as any).replace(/\$/, ""));
            
            // Compare the numbers for sorting
            return priceA - priceB;
        }
    },
   
]