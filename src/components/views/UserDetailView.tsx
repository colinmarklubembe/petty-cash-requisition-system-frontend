import React from "react";
import { UserCompany } from "../../types/User";

interface UserDetailViewProps {
  userCompany: UserCompany;
}

const UserDetailView: React.FC<UserDetailViewProps> = ({ userCompany }) => {
  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg mx-auto">
      <div className="mb-4">
        <h5 className="text-2xl font-semibold tracking-tight text-gray-900">
          User Details
        </h5>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <strong className="text-gray-700">First Name:</strong>
          <span className="text-gray-900">{userCompany.user.firstName}</span>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-gray-700">Middle Name:</strong>
          <span className="text-gray-900">
            {userCompany.user.middleName || "N/A"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-gray-700">Last Name:</strong>
          <span className="text-gray-900">{userCompany.user.lastName}</span>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-gray-700">Email:</strong>
          <span className="text-gray-900">{userCompany.user.email}</span>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-gray-700">Phone Number:</strong>
          <span className="text-gray-900">
            {userCompany.user.phoneNumber || "N/A"}
          </span>
        </div>
        {userCompany && (
          <div className="flex items-center justify-between">
            <strong className="text-gray-700">Role:</strong>
            <span className="text-gray-900">{userCompany.role}</span>
          </div>
        )}
        {!userCompany && (
          <div className="text-red-500">No role found for this company.</div>
        )}
      </div>
    </div>
  );
};

export default UserDetailView;
