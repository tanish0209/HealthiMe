import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-xl font-medium">All Appointments</p>
      <div className="bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-200">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((appointment, index) => (
          <div
            key={appointment._id}
            className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-4 px-6 border-b  border border-gray-200 hover:bg-gray-100 transition-all duration-300"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <p>{appointment.userData.name}</p>
            <p className="max-sm:hidden">
              {calculateAge(appointment.userData.dob)}
            </p>
            <p>
              {slotDateFormat(appointment.slotDate)} , {appointment.slotTime}
            </p>
            <p>{appointment.doctorData.name}</p>
            <p>${appointment.doctorData.fees}</p>
            <p>
              {appointment.cancelled ? (
                <span className="text-red-400  font-medium">Cancelled</span>
              ) : appointment.isCompleted ? (
                <p className="text-green-500  font-medium">Completed</p>
              ) : (
                <button
                  onClick={() => cancelAppointment(appointment._id)}
                  className="text-white bg-red-500 px-3 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
