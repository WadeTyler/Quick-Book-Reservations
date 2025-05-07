import React from 'react';
import {Business} from "@/types/business.types";
import Image from "next/image";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "@/lib/auth.service";
import {User} from "@/types/auth.types";
import {RiUser2Line, RiVipCrown2Line} from "@remixicon/react";
import ImageContainer from "@/components/businesses/ImageContainer";

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
      <ImageContainer image={business.image} alt={`${business.name}'s Image`} />

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