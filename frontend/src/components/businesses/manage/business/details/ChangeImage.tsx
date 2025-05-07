import React, {FormEvent, useState} from 'react';
import {ClickAwayListener} from "@mui/material";
import {ManagedBusiness} from "@/types/business.types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeBusinessImage, updateBusinessImage} from "@/lib/business.service";
import {LoadingSpinnerLG} from "@/components/LoadingSpinners";
import ImageContainer from "@/components/util/ImageContainer";

const ChangeImage = ({managedBusiness, closeFn}: {
  managedBusiness: ManagedBusiness;
  closeFn: () => void;
}) => {

  const queryClient = useQueryClient();

  const [updatedImagePreview, setUpdatedImagePreview] = useState<string | null>(managedBusiness.image);
  const [updatedImage, setUpdatedImage] = useState<File | null>(null);
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const {
    mutate: handleUpdateBusinessImage,
    isPending: isUpdatingBusinessImage
  } = useMutation({
    mutationFn: updateBusinessImage,
    onSuccess: (updatedManagedBusiness: ManagedBusiness) => {
      queryClient.setQueryData(['managedBusiness'], updatedManagedBusiness);

      closeFn();
    },
    onError: (error) => {
      setErrorMsg((error as Error).message);
    }
  })

  const {mutate: handleRemoveImage, isPending: isRemovingImage} = useMutation({
    mutationFn: removeBusinessImage,
    onSuccess: (updatedManagedBusiness: ManagedBusiness) => {
      queryClient.setQueryData(['managedBusiness'], updatedManagedBusiness);

      closeFn();
    },
    onError: (error) => {
      setErrorMsg((error as Error).message);
    }
  })

  function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    if (!isImageChanged || !updatedImage) return;

    handleUpdateBusinessImage({
      businessId: managedBusiness.id, updateBusinessImageRequest: {
        image: updatedImage
      }
    })
  }

  return (
    <ClickAwayListener onClickAway={closeFn}>
      <form
        className="max-w-96 w-full rounded-md flex flex-col gap-4 bg-background overflow-hidden"
        onSubmit={handleSubmitForm}
      >
        <div className="flex flex-col gap-4 p-4">
          <h2 className="font-semibold text-accent tracking-wide text-3xl">Change Image</h2>

          <fieldset className="input-container gap-4!">
            {/* Preview */}
            <ImageContainer image={updatedImagePreview} alt={'Image preview'} />

            <input id="business-image" name="business-image" type="file" accept="image/**" hidden
                   onChange={(e) => {
                     const file = e.target.files ? e.target.files[0] : null;

                     if (file) {
                       setUpdatedImagePreview(URL.createObjectURL(file));
                       setUpdatedImage(file);
                       setIsImageChanged(true);
                     }
                   }}
            />
            <div className="flex items-center gap-4 w-full text-sm justify-center">
              <label htmlFor="business-image" className="submit-btn3">Change Image</label>
              {managedBusiness.image && (
                <button className="delete-btn3" type="button" onClick={() => handleRemoveImage({businessId: managedBusiness.id})}>Remove Image</button>
              )}
            </div>
          </fieldset>

          {/* Error Message */}
          {errorMsg && !isUpdatingBusinessImage && !isRemovingImage && (
            <p className="error-msg">{errorMsg}</p>
          )}

        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 p-4 bg-background-secondary">
          {/* Loading */}
          {(isUpdatingBusinessImage || isRemovingImage) ? (
            <LoadingSpinnerLG/>
          ) : (
            <>
              <button type="button" className="hover:text-gray-400 text-gray-500 cursor-pointer"
                      onClick={closeFn}>Cancel
              </button>
              <button type="submit" className="submit-btn3">Save Changes</button>
            </>
          )}
        </div>
      </form>
    </ClickAwayListener>
  );
};

export default ChangeImage;