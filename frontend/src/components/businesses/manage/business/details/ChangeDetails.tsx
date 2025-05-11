import React, {useState} from 'react';
import {ManagedBusiness, UpdateBusinessDetailsRequest} from "@/types/business.types";
import {ClickAwayListener} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBusinessDetails} from "@/lib/manage-business.service";

const ChangeDetails = ({managedBusiness, closeFn}: {
  managedBusiness: ManagedBusiness;
  closeFn: () => void;
}) => {

  const queryClient = useQueryClient();

  const [updateBusinessDetailsRequest, setUpdateBusinessDetailsRequest] = useState<UpdateBusinessDetailsRequest>({
    name: managedBusiness.name,
    description: managedBusiness.description
  });

  const {
    mutate: handleUpdateBusinessDetails,
    isPending: isUpdatingBusinessDetails,
    error: updateBusinessDetailsError
  } = useMutation({
    mutationFn: updateBusinessDetails,
    onSuccess: async (updatedManagedBusiness: ManagedBusiness) => {
      queryClient.setQueryData(['managedBusiness'], updatedManagedBusiness);
      closeFn();
    }
  })

  return (
    <ClickAwayListener onClickAway={closeFn}>
      <form className="max-w-96 w-full rounded-md flex flex-col gap-4 bg-background overflow-hidden" onSubmit={(e) => {
        e.preventDefault();
        handleUpdateBusinessDetails({businessId: managedBusiness.id, updateBusinessDetailsRequest});
      }}>

        <div className="flex flex-col gap-4 p-4">
          <h2 className="font-semibold text-accent tracking-wide text-3xl">Change Details</h2>

          <fieldset className="input-container">
            <label htmlFor="business-name" className="input-label">Business Name*:</label>
            <input type="text" className="input-bar" placeholder="Enter a business name" required minLength={3}
                   maxLength={100} value={updateBusinessDetailsRequest.name}
                   onChange={(e) => setUpdateBusinessDetailsRequest(prev => ({
                       ...prev,
                       name: e.target.value
                     })
                   )}/>
          </fieldset>

          <fieldset className="input-container">
            <label htmlFor="business-description" className="input-label">Business Description*:</label>
            <textarea name="business-description" id="business-description" cols={30} rows={10} className="input-bar"
                      placeholder="Enter a business description" required minLength={20} maxLength={500}
                      value={updateBusinessDetailsRequest.description}
                      onChange={(e) => setUpdateBusinessDetailsRequest(prev => ({
                          ...prev,
                          description: e.target.value
                        })
                      )}></textarea>
          </fieldset>

          {updateBusinessDetailsError && !isUpdatingBusinessDetails && (
            <p className="error-msg">{(updateBusinessDetailsError as Error).message}</p>
          )}

        </div>

        <div className="flex items-center justify-end gap-4 p-4 bg-background-secondary">
          <button type="button" className="hover:text-gray-400 text-gray-500 cursor-pointer" onClick={closeFn}>Cancel
          </button>
          <button type="submit" className="submit-btn3">Save Changes</button>
        </div>

      </form>
    </ClickAwayListener>
  );
};

export default ChangeDetails;