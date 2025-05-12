import React from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {removeStaff} from "@/features/business/lib/manage-business.service";
import {ManagedBusiness} from "@/types/business.types";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/features/auth/lib/auth.service";
import {LoadingSpinnerSM} from "@/components/LoadingSpinners";
import {RiVipCrown2Line} from "@remixicon/react";

const StaffList = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {


  const queryClient = useQueryClient();

  const {mutate: handleRemoveStaff, isPending: isRemovingStaff, error: removeStaffError} = useMutation({
    mutationFn: removeStaff,
    onSuccess: (updatedManagedBusiness: ManagedBusiness) => {
      queryClient.setQueryData(['managedBusiness'], updatedManagedBusiness);
    }
  })

  // Auth User
  const {data: authUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser,
  });

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
      {/* Current Staff */}
      <div className="w-full p-4 flex flex-col gap-4 bg-background-secondary rounded-md shadow-md lg:col-span-2">
        <h2 className="font-semibold text-xl">Current Staff Members</h2>

        {managedBusiness.staff.length === 0 ? (
          <p className="text-gray-500 italic">No staff members yet.</p>
        ) : (
          <div className="overflow-x-auto overflow-y-auto max-h-[35rem]">
            <table className="min-w-full bg-background rounded-md">
              <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Email</th>
                <th className="py-3 px-4 text-right font-semibold">Actions</th>
              </tr>
              </thead>
              <tbody>

              {/* Business Owner */}
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <p className="font-medium">{managedBusiness.owner.firstName} {managedBusiness.owner.lastName}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-gray-500">{managedBusiness.owner.username}</p>
                </td>

                <td className="py-3 px-4 text-right">
                  <span className="inline-flex gap-1 items-end justify-end text-accent"><RiVipCrown2Line/> Owner</span>
                </td>
              </tr>

              {/* Map Staff Members */}
              {managedBusiness.staff.map((staffMember) => (
                <tr key={staffMember.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium">{staffMember.firstName} {staffMember.lastName}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-gray-500">{staffMember.username}</p>
                  </td>

                  <td className="py-3 px-4 text-right">
                    {/* Remove Button */}
                    {managedBusiness.owner.id === authUser?.id && (
                      <button
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => {
                          handleRemoveStaff({businessId: managedBusiness.id, staffId: staffMember.id});
                        }}
                      >
                        {!isRemovingStaff ? (
                          <span>Remove</span>
                        ) : (
                          <LoadingSpinnerSM/>
                        )}
                      </button>
                    )}
                  </td>

                </tr>
              ))}
              </tbody>
            </table>
            {removeStaffError && !isRemovingStaff && (
              <p className="error-msg">{(removeStaffError as Error).message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

}


export default StaffList;