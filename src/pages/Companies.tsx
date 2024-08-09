import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { companyApi } from "../api";
import { useNavigate } from "react-router-dom";
import { useSessionCheck } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CompanyFormInputs } from "../components/forms/CreateCompany";
import { Company, CompanyResponse } from "../types/Company";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  CreateCompany,
  LoadingSpinner,
  SessionExpiredDialog,
} from "../components";

const CompaniesPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companiesWithRoles, setCompaniesWithRoles] = useState<
    { company: Company; role: string }[]
  >([]);
  const [showCreateCompanyModal, setShowCreateCompanyModal] = useState(false);
  const { showSessionExpiredDialog, setShowSessionExpiredDialog } =
    useSessionCheck();

  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setShowCreateCompanyModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const companiesData: CompanyResponse = await companyApi.getCompanies();
      const companiesWithRoles = companiesData.data.companies.map(
        (companyData) => ({
          company: companyData.company,
          role: companyData.role,
        })
      );
      setCompaniesWithRoles(companiesWithRoles);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to fetch approvals. Please try again.";
      setError(errorMessage);
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies, companies]);

  const handleCreateCompany = (newCompanyInput: CompanyFormInputs) => {
    const newCompany: Company = {
      name: newCompanyInput.name,
      description: "",
      address: newCompanyInput.address,
      phoneNumber: newCompanyInput.phone,
      companyEmail: newCompanyInput.companyEmail,
      id: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
    setShowCreateCompanyModal(false);
  };

  const handleCompanyClick = (companyId: string, role: string) => {
    localStorage.setItem("companyId", companyId);
    localStorage.setItem("userRole", role);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#202046]">Your Companies</h1>
          <button
            onClick={() => setShowCreateCompanyModal(true)}
            className="flex items-center bg-[#202046] text-white px-4 py-2 rounded-full hover:bg-[#F05A28]"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create New
            Company
          </button>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div
            className={`grid gap-8 ${
              companiesWithRoles.length === 1
                ? "grid-cols-1"
                : companiesWithRoles.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {companiesWithRoles.map(({ company, role }, index) => (
              <div
                key={index}
                onClick={() => handleCompanyClick(company.id, role)}
                className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-[#202046]"
                style={{ minHeight: "200px" }}
              >
                <h2 className="text-xl font-bold mb-2 text-[#202046]">
                  {company.name}
                </h2>
                <p className="text-gray-700 mb-4">
                  {company.description || "No description available"}
                </p>
                <div className="text-gray-600 text-sm">
                  <p>
                    <strong>Address:</strong> {company.address.street},{" "}
                    {company.address.city}, {company.address.state},{" "}
                    {company.address.country}
                  </p>
                  <p>
                    <strong>Phone:</strong> {company.phoneNumber}
                  </p>
                  <p>
                    <strong>Email:</strong> {company.companyEmail}
                  </p>
                  <p>
                    <strong>Role:</strong> {role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateCompanyModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white p-4 rounded-lg shadow-lg w-1/2 md:w-1/3 relative"
            ref={formRef}
          >
            <button
              title="Close"
              onClick={() => setShowCreateCompanyModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586L3.707 2.293A1 1 0 002.293 3.707L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293a1 1 0 001.414-1.414L11.414 10l6.293-6.293a1 1 0 00-1.414-1.414L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <CreateCompany
              onClose={() => setShowCreateCompanyModal(false)}
              onCreate={handleCreateCompany}
            />
          </div>
        </div>
      )}
      {showSessionExpiredDialog && (
        <SessionExpiredDialog
          onClose={() => setShowSessionExpiredDialog(false)}
        />
      )}
    </div>
  );
};

export default CompaniesPage;
