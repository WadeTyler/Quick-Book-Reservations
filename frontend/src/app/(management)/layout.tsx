import {ReactNode} from "react";

export default function ManagementLayout({children}: {children: ReactNode}) {
 return (
   <div className="w-full">
     {children}
   </div>
 )
}