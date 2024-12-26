import { ColumnDef } from "@tanstack/react-table"
import Zoom from 'react-medium-image-zoom'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import '../../app/globals.css'


export type Entry = {
    company? : String,
    item? : String
    Image? : HTMLImageElement,
    Price? : String
    Link? : String,

}


export const columns : ColumnDef<Entry>[] = [
    {
        accessorKey: "companyname",
        header: ({column}) => {

            return (
                   <Button
                    className="text-white"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Company
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
            )

        },
        cell: (props) => {
            
            let data = (props.getValue()) as string

            
            return(
                <div className="flex flex-row items-center"><p className="font-['SatoshiMed']" >{data}</p></div>
            )
        }
    },
    {
        accessorKey: "title",
        header: ({column}) => {
            return (<p className="text-white">Item</p>)
        },
        cell: (props) => {
            const data = (props.getValue() as string)
            return(
                <p className="font-['SatoshiMed']">{data}</p>
            )
        }
    },
    {
        accessorKey: "img",
        header: ({column}) => {
            return (<p className="text-white">Image</p>)
        },
        cell: (props) => {
             const imgUrl = (props.getValue() as string)
             
            return(
                
            <img
            src={imgUrl}
            style={{width:"100px", height:"100px", objectFit: 'cover' }}
            >
                
            </img>)
        }
    },
    {
        accessorKey: "price",
        header: ({column}) => {

            return (
                   <Button
                   className="text-white"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
            )

        },
        cell: (props) => {

            let dat = props.getValue() as string
            return (
            <p className="font-['SatoshiMed']">{dat}</p>
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
    {
        accessorKey: "productlink",
        header: ({column}) => {
            return (<p className="text-white">Link</p>)
        },
        cell: (props) => {
            let url = (props.getValue() as string)
            
            

            if(url.includes("temu"))
            {
                url = url + "?&_x_ads_channel=kol_affiliate&_x_campaign=affiliate&_x_cid=2045100270"
            }

            //<Link className="font-['SatoshiMed']" style={{height:"100px", width:"100px"}} href={url}>{url}</Link>
            return(<Button asChild>
                <Link className="font-['SatoshiMed']" style={{height:"50%", width:"100px"}} href={url}>Buy</Link>
            </Button>)
        }
    }
]