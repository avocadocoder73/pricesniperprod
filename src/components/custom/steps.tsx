import { Card, CardContent, CardHeader } from "../ui/card"



export default function Step(props : any)
{
    return (<Card className="bg-[#fa9886] flex-shrink-0 md:w-[20vw] sm:lg:h-[45vw] md:h-[70vw] lg:h-[45vw] xl:h-[35vw] 2xl:h-[25vw] mt-10 h-1/2 w-1/2 ml-0">
        <CardHeader className="text-white text-xl font-SB">{props.header}</CardHeader>
        <CardContent className="flex flex-col items-center">
            {props.img}
            <div className="font-SB text-white text-center">{props.content}</div>
        </CardContent>
    </Card>)
}