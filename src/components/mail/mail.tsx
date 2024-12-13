
import { Separator } from "../ui/separator";
import { MailSidebar } from "./mail-sidebar";

export function Mail(){
    return (
        <>
        <div className="h-screen">
            <MailSidebar/>
            <Separator orientation="vertical"/>
        </div>
        </>
    )
}