import React, {useState} from 'react';
import {ManagedBusiness} from "@/types/business.types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addStaff} from "@/lib/business.service";
import {LoadingSpinnerSM} from "@/components/LoadingSpinners";

const AddStaffMember = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {

  const queryClient = useQueryClient();

  const [email, setEmail] = useState<string>('');

  const {mutate: handleAddStaff, isPending: isAddingStaff, error: addStaffError} = useMutation({
    mutationFn: addStaff,
    onSuccess: async (updatedManagedBusiness: ManagedBusiness) => {

      // update managedBusiness to the new one
      queryClient.setQueryData(['managedBusiness'], updatedManagedBusiness);
      setEmail('');
    },
  });

  const submitDisabled = isAddingStaff || !email;

  return (
    <div className="w-full p-4 flex flex-col gap-4 bg-background-secondary rounded-md shadow-md lg:col-span-2">
      <h2 className="font-semibold text-xl">Add Staff Member</h2>

      <form className="flex flex-col gap-4" onSubmit={(e) => {
        e.preventDefault();

        if (submitDisabled) return;
        handleAddStaff({
          businessId: managedBusiness.id,
          staffManagementDTO: {
            email: email
          }
        })
      }}>
        <fieldset className="input-container">
          <label htmlFor="staff-email" className="input-label">Email Address</label>
          <input
            type="email"
            id="staff-email"
            name="staff-email"
            className="input-bar"
            placeholder="Enter staff member's email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-sm text-gray-500">The user must have an account with this email.</p>
        </fieldset>

        {addStaffError && !isAddingStaff && (
          <p className="error-msg">{(addStaffError as Error).message}</p>
        )}

        <button type="submit" disabled={submitDisabled} className="submit-btn3 mt-2">
          {!isAddingStaff ? (
            <span>Add Staff Member</span>
          ) : (
            <LoadingSpinnerSM />
          )}
        </button>
      </form>
    </div>
  );
};

export default AddStaffMember;