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
                className="w-auto h-auto flex object-contain"
                
                />)
        }
    },
    {
        accessorKey: "companyname",        
        header: ({column}) => {

            let sorted = column.getIsSorted()
            let color = sorted ? (!(sorted === 'asc') ? 'bg-[#f48889] text-white' : 'bg-white text-black') : 'bg-[#f48889] text-white'
            return (
                   <Button
                   
                    className={`bg-[#f48889] ml-0 md:text-lg ${color} text-xs`}
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Recommended
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
            )

        },
        cell: ({row}) => {
            
            let data = row.original.companyname as string
            
            let companyimg = row.original.companyimg as string

            data = data.replace(/^(.*)\1$/, '$1');

            return(
                <div className="flex flex-row items-center"><img className="pr-[0.2vw]  md:w-auto" src={companyimg}></img><p className="font-['SatoshiMed'] text-xs md:text-xl" >{data}</p></div>
            )
        },
        sortingFn: (rowA: any, rowB: any, columnId: any) => {
            // Strip the $ sign and convert to a float for comparison
           const nameA = rowA.original.companyname;
    const nameB = rowB.original.companyname;

    const priorityOrder = ['amazon.com', 'temu', 'ebay', 'aliexpress', 'walmart'];

    const indexA = priorityOrder.indexOf(nameA);
    const indexB = priorityOrder.indexOf(nameB);

    // If both names are in the priority list, sort by their priority
    if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
    }

    // If only one name is in the priority list, prioritize that one
    if (indexA !== -1) {
        return -1;
    }
    if (indexB !== -1) {
        return 1;
    }

    // If neither name is in the priority list, sort alphabetically
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    return 0;
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

            let sorted = column.getIsSorted()
            let color = sorted ? (!(sorted === 'asc') ? 'bg-[#f48889] text-white' : 'bg-white text-black') : 'bg-[#f48889] text-white'

            return (
                   <Button
                   className={`${color} md:text-lg  text-xs`}
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

            let indices = [];
            let index = dat.indexOf('$');

            while (index !== -1) {
                indices.push(index);
                index = dat.indexOf('$', index + 1); // Find next '$'
            }

            if(indices.length > 1)
            {
                const match = dat.match(/\$\d+(\.\d{2})?/);
                dat = match ? match[0] : ''
            }

            dat = dat.replace('*', '')
            //<Link className="font-['SatoshiMed']" style={{height:"100px", width:"100px"}} href={url}>{url}</Link>
            if(url.includes("aliexpress"))
            {
                fetch("")

            }
            return (
            <div className="flex flex-row justify-between h-full items-end"><p className="font-['SatoshiMed'] ml-[0.2vw] md:text-5xl underline italic font-bold text-xs leading-none decoration-skip-ink-none">{dat}</p>
            <Button  className="bg-[#f48889] font-SB border-white border-2 md:h-[3.1rem] text-[2vw] md:text-3xl " asChild>
                <Link target="_blank" rel="noopener noreferrer" href={url}>View</Link>
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