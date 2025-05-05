import React from 'react';
import {Business} from "@/types/business.types";
import Image from "next/image";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "@/lib/auth.service";
import {User} from "@/types/auth.types";
import {RiUser2Line, RiVipCrown2Line} from "@remixicon/react";

const ManagedBusinessPanel = ({business}: {
  business: Business;
}) => {

  // Auth User
  const {data: authUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser
  });

  const isOwner: boolean = authUser?.id === business.ownerId;


  return (
    <div className="w-full min-h-48 h-full bg-background-secondary rounded-md shadow-md overflow-hidden">

      {/* Image */}
      <div className="w-full bg-gray-500 relative aspect-video flex items-end justify-start p-4">
        {business.image && (
          <Image src={business.image} alt={`Image for ${business.name}`} fill={true} objectFit='cover'
                 objectPosition='center'/>
        )}
        {!business.image && (
          <span className="text-center text-gray-600 italic tracking-widest">No Image</span>
        )}
      </div>

      {/* Info Container */}
      <div className="p-4 flex flex-col gap-2">
        {/* Business Name */}
        <h3 className="text-lg md:text-xl font-semibold tracking-wide">
          {business.name.length < 40 ? business.name : business.name.substring(0, 37) + "..."}
        </h3>

        {/* Is Owner or Staff */}
        <div className="text-gray-400 tracking-wide inline-flex gap-2 italic items-center">
          {isOwner ? (
            <>
              <RiVipCrown2Line/>
              <span>Owner</span>
            </>
          ) : (
            <>
              <RiUser2Line />
              <span>Staff</span>
            </>
          )}
        </div>

        <Link href={`/businesses/manage/${business.id}`} className="submit-btn3">Manage</Link>
      </div>

    </div>
  );
};

export default ManagedBusinessPanel;