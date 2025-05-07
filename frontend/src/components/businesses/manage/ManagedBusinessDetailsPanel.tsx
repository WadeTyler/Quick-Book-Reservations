import React, {useState} from 'react';
import {ManagedBusiness} from "@/types/business.types";
import Overlay from "@/components/util/Overlay";
import ChangeDetails from "@/components/businesses/manage/details/ChangeDetails";
import ChangeImage from "@/components/businesses/manage/details/ChangeImage";
import ImageContainer from "@/components/businesses/ImageContainer";

const ManagedBusinessDetailsPanel = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {

  const [isChangingDetails, setIsChangingDetails] = useState<boolean>(false);
  const [isChangingImage, setIsChangingImage] = useState<boolean>(false);

  return (
    <div className="w-full flex lg:flex-row flex-col bg-background-secondary rounded-md shadow-md lg:col-span-2 overflow-hidden">
      {/* Left Side */}
      <ImageContainer image={managedBusiness.image} alt={`${managedBusiness.name}'s Image`} />

      {/* Right Side */}
      <div className="flex flex-col gap-4 w-full p-4">
        <h2 className="font-semibold text-xl">Business Details</h2>
        <p>Owner: {managedBusiness.owner?.firstName + " " + managedBusiness.owner?.lastName}</p>
        <p>Created At: {new Date(managedBusiness.createdAt).toLocaleDateString()}</p>
        <p className="wrap-anywhere">Description: {managedBusiness.description}</p>

        <div className="flex items-center gap-4">
          <button className="submit-btn3 mt-auto" onClick={() => setIsChangingDetails(true)}>Change Details</button>
          <button className="submit-btn3 mt-auto" onClick={() => setIsChangingImage(true)}>Change Image</button>
        </div>
      </div>



      {isChangingDetails && (
        <Overlay>
          <ChangeDetails managedBusiness={managedBusiness} closeFn={() => setIsChangingDetails(false)} />
        </Overlay>
      )}

      {isChangingImage && (
        <Overlay>
          <ChangeImage managedBusiness={managedBusiness} closeFn={() => setIsChangingImage(false)} />
        </Overlay>
      )}
    </div>
  );
};

export default ManagedBusinessDetailsPanel;