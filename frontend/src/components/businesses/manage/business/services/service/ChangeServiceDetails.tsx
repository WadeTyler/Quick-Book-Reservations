import React, {FormEvent, useState} from 'react';
import {ManagedBusiness, ManageServiceOfferingRequest, ServiceOffering} from "@/types/business.types";
import {ClickAwayListener} from "@mui/material";
import ImageContainer from "@/components/util/ImageContainer";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateService} from "@/lib/business.service";
import {LoadingSpinnerSM} from "@/components/LoadingSpinners";

const ChangeServiceDetails = ({serviceOffering, closeFn}: {
  serviceOffering: ServiceOffering;
  closeFn: () => void;
}) => {

  const queryClient = useQueryClient();

  const [imagePreview, setImagePreview] = useState<string>(serviceOffering.image);

  const [formData, setFormData] = useState<ManageServiceOfferingRequest>({
    name: serviceOffering.name,
    description: serviceOffering.description,
    type: serviceOffering.type,
    image: null,
    removeImage: false,
  });

  function resetImage() {
    // Reset
    setFormData(prev => ({
      ...prev,
      image: null,
      removeImage: false
    }));
    setImagePreview(serviceOffering.image);
  }

  const {mutate: handleUpdateService, isPending: isUpdating, error: updateError} = useMutation({
    mutationFn: updateService,
    onSuccess: (updatedManagedBusiness: ManagedBusiness) => {
      queryClient.setQueryData(['managedBusiness'], updatedManagedBusiness);
      closeFn();
    }
  })

  const isChanged = formData.name !== serviceOffering.name || formData.description !== serviceOffering.description || formData.type !== serviceOffering.type || formData.image || formData.removeImage;

  const isDisabled = !isChanged || isUpdating

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (isDisabled) return;

    handleUpdateService({
      businessId: serviceOffering.businessId,
      serviceId: serviceOffering.id,
      manageServiceRequest: formData
    })
  }

  return (
    <ClickAwayListener onClickAway={closeFn}>
      <form
        onSubmit={handleSubmit}
        className="max-w-96 w-full bg-background rounded-md shadow-md overflow-hidden"
      >
        <div className="flex flex-col gap-4 items-center w-full">


          <div className="flex flex-col gap-4 p-4 w-full">
            <h2 className="text-accent font-semibold tracking-wide text-3xl">Change Details</h2>

            {/* Name */}
            <fieldset className="input-container">
              <label htmlFor="name" className="input-label">Name*:</label>
              <input type="text"
                     className="input-bar"
                     id="name"
                     placeholder="Enter a name for your serviceOffering"
                     required
                     minLength={3}
                     maxLength={100}
                     value={formData.name}
                     onChange={(e) => setFormData(prev => ({
                       ...prev,
                       name: e.target.value
                     }))}
              />
            </fieldset>

            {/* Type */}
            <fieldset className="input-container">
              <label htmlFor="type" className="input-label">Type*:</label>
              <input type="text"
                     className="input-bar"
                     id="type"
                     placeholder="Enter a type for your serviceOffering. Ex: 'Appointment'"
                     required
                     minLength={3}
                     maxLength={100}
                     value={formData.type}
                     onChange={(e) => setFormData(prev => ({
                       ...prev,
                       type: e.target.value
                     }))}
              />
            </fieldset>

            {/* Description */}
            <fieldset className="input-container">
              <label htmlFor="name" className="input-label">Description*:</label>
              <textarea className="input-bar resize-none h-40"
                        placeholder="Enter a description for your serviceOffering"
                        required
                        minLength={20}
                        maxLength={500}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          description: e.target.value
                        }))}
              />
            </fieldset>

            <fieldset className="input-container">
              <ImageContainer image={imagePreview} alt={`Image Preview`}/>

              <input type="file" id="image" hidden accept="image/*" onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;

                if (file) {
                  setFormData(prev => ({
                    ...prev,
                    image: file,
                    removeImage: false
                  }));
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  resetImage();
                }
              }}
              />
              <div className="flex gap-4 w-full">
                <label htmlFor="image" className="submit-btn3">Change Image</label>
                {serviceOffering.image && !formData.removeImage && (
                  <button type="button" className="delete-btn3" onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      image: null,
                      removeImage: true
                    }));
                    setImagePreview('');
                  }}>Remove Image</button>
                )}
                {(formData.image || formData.removeImage) && (
                  <button type="button" className="submit-btn3" onClick={resetImage}>Reset Image</button>
                )}
              </div>
            </fieldset>

            {updateError && (
              <p className="error-msg">{(updateError as Error).message}</p>
            )}

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 p-4 bg-background-secondary">
          {!isUpdating ? (
            <>
              <button type="button" className="cancel-btn" onClick={closeFn}>Cancel</button>
              <button type="submit" className={`submit-btn3 ${isDisabled && 'submit-btn3-disabled'}`}>Save Changes</button>
            </>
          ) : (
            <LoadingSpinnerSM/>
          )}
        </div>
      </form>
    </ClickAwayListener>

  );
};

export default ChangeServiceDetails;