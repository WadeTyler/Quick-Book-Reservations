import React, { useState, useMemo, useCallback } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchAllReservations } from "@/features/reservation/lib/reservation.service";
import { ManagedBusiness } from "@/types/business.types";
import { Reservation } from "@/types/reservation.types";
import LoadingHandler from "@/components/LoadingHandler";
import SelectedReservation from "@/app/businesses/manage/[businessId]/reservations/SelectedReservation";

const ReservationsCalendar = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {
  // State for current month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  // Fetch reservations
  const {data: allReservations, isPending: isLoadingAllReservations, error: loadAllReservationsError} = useQuery({
    queryKey: ['allReservations', managedBusiness.id],
    queryFn: () => fetchAllReservations(managedBusiness.id)
  });



  // Navigation functions
  const goToPreviousMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }, [currentMonth, currentYear]);

  const goToNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }, [currentMonth, currentYear]);

  const goToCurrentMonth = useCallback(() => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  }, []);

  // Calendar data generation
  const calendarData = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Create array of days for the calendar
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentMonth, currentYear]);

  // Group reservations by date
  const reservationsByDate = useMemo(() => {
    if (!allReservations) return {};

    const grouped: Record<string, Reservation[]> = {};

    allReservations.forEach(reservation => {
      const date = reservation.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(reservation);
    });

    return grouped;
  }, [allReservations]);

  // Format date string for lookup
  const formatDateString = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  };

  // Get reservations for a specific day
  const getReservationsForDay = (day: number) => {
    if (!day) return [];
    const dateString = formatDateString(day);
    return reservationsByDate[dateString] || [];
  };

  // Month names for display
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Day names for display
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <LoadingHandler isLoading={isLoadingAllReservations} object={allReservations} error={loadAllReservationsError}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{monthNames[currentMonth]} {currentYear}</h2>
            <div className="flex gap-2">
              <button 
                onClick={goToPreviousMonth}
                className="submit-btn3 py-1 px-3"
              >
                Previous
              </button>
              <button 
                onClick={goToCurrentMonth}
                className="submit-btn3 py-1 px-3"
              >
                Today
              </button>
              <button 
                onClick={goToNextMonth}
                className="submit-btn3 py-1 px-3"
              >
                Next
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day Headers */}
            {dayNames.map((day, index) => (
              <div key={index} className="text-center font-semibold p-2 bg-accent text-white">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarData.map((day, index) => {
              const reservations = day ? getReservationsForDay(day) : [];
              const isToday = day && 
                currentMonth === new Date().getMonth() && 
                currentYear === new Date().getFullYear() && 
                day === new Date().getDate();

              return (
                <div 
                  key={index} 
                  className={`min-h-24 border p-1 ${day ? 'bg-white' : 'bg-gray-100'} 
                    ${isToday ? 'border-accent border-2' : 'border-gray-200'}`}
                >
                  {day && (
                    <>
                      <div className="text-right font-medium">{day}</div>
                      {reservations.length > 0 && (
                        <div className=" text-center p-2 font-semibold text-xl w-fit h-fit rounded-full bg-accent text-white mx-auto my-auto">
                          {reservations.length}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reservation Details Modal */}
          {selectedReservation && (
            <SelectedReservation selectedReservation={selectedReservation} closeFn={() => setSelectedReservation(null)} managedBusiness={managedBusiness} />
          )}

          {/* Empty State */}
          {allReservations && allReservations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No reservations found for this business.</p>
            </div>
          )}
        </div>
      </div>
    </LoadingHandler>
  );
};

export default ReservationsCalendar;
