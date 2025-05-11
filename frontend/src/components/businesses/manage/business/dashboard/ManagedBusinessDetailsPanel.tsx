import React, {useState} from 'react';
import {ManagedBusiness} from "@/types/business.types";
import Overlay from "@/components/util/Overlay";
import ChangeDetails from "@/components/businesses/manage/business/details/ChangeDetails";
import ChangeImage from "@/components/businesses/manage/business/details/ChangeImage";
import ImageContainer from "@/components/util/ImageContainer";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/lib/auth.service";
import Link from "next/link";

const ManagedBusinessDetailsPanel = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {

  const [isChangingDetails, setIsChangingDetails] = useState<boolean>(false);
  const [isChangingImage, setIsChangingImage] = useState<boolean>(false);

  // Auth User
  const {data: authUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser,
  });

  return (
    <div
      className="w-full flex lg:flex-row flex-col bg-background-secondary rounded-md shadow-md lg:col-span-2 overflow-hidden">
      {/* Left Side */}
      <ImageContainer image={managedBusiness.image} alt={`${managedBusiness.name}'s Image`}/>

      {/* Right Side */}
      <div className="flex flex-col gap-4 w-full p-4">
        <h2 className="font-semibold text-xl">Business Details</h2>
        <p>Owner: {managedBusiness.owner?.firstName + " " + managedBusiness.owner?.lastName}</p>
        <p>Created At: {new Date(managedBusiness.createdAt).toLocaleDateString()}</p>
        <p className="wrap-anywhere">Description: {managedBusiness.description}</p>


        <div className="flex items-center gap-4 mt-auto text-sm">
          <Link href={`/businesses/${managedBusiness.id}`} className="submit-btn3">Visit Business Page</Link>
          
          {authUser && authUser.id === managedBusiness.owner.id && (
            <>
              <button className="submit-btn3 mt-auto" onClick={() => setIsChangingDetails(true)}>Change Details</button>
              <button className="submit-btn3 mt-auto" onClick={() => setIsChangingImage(true)}>Change Image</button>
            </>
          )}
        </div>
      </div>


      {isChangingDetails && (
        <Overlay>
          <ChangeDetails managedBusiness={managedBusiness} closeFn={() => setIsChangingDetails(false)}/>
        </Overlay>
      )}

      {isChangingImage && (
        <Overlay>
          <ChangeImage managedBusiness={managedBusiness} closeFn={() => setIsChangingImage(false)}/>
        </Overlay>
      )}
    </div>
  );
};

export default ManagedBusinessDetailsPanel;