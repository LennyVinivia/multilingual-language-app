"use client";

import { FC, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { LabeledInput } from "./ui/labeled-input";
import { InlineCheckboxGroup } from "./ui/inline-checkbox-group";
import { Patient } from "./create-project/CreateProjectPage";

interface PatientModalProps {
  onClose: () => void;

  // If editing an existing patient, pass that data
  editingPatient?: Patient | null;

  // Called if we are adding a NEW patient
  onAddPatient?: (newPatient: Patient) => void;

  // Called if we are editing an EXISTING patient
  onUpdatePatient?: (updatedPatient: Patient) => void;
}

export const AddPatientModal: FC<PatientModalProps> = ({
  onClose,
  editingPatient = null,
  onAddPatient,
  onUpdatePatient,
}) => {
  // Local form states
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState<"M" | "W" | "">("");
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [ahvNumber, setAhvNumber] = useState("");

  // If editing an existing patient, prefill the fields
  useEffect(() => {
    if (editingPatient) {
      setName(editingPatient.name);
      setFirstName(editingPatient.firstName);
      setBirthdate(editingPatient.birthdate);
      setGender(editingPatient.gender);
      setNationality(editingPatient.nationality || "");
      setAddress(editingPatient.address);
      setPostalCode(editingPatient.postalCode);
      setCity(editingPatient.city);
      setInsuranceNumber(editingPatient.insuranceNumber);
      setAhvNumber(editingPatient.ahvNumber);
    }
  }, [editingPatient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      name,
      firstName,
      birthdate,
      gender,
      nationality,
      address,
      postalCode,
      city,
      insuranceNumber,
      ahvNumber,
    };

    if (editingPatient && onUpdatePatient) {
      // We are editing an existing patient
      onUpdatePatient(newPatient);
    } else if (onAddPatient) {
      // We are adding a new patient
      onAddPatient(newPatient);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal content */}
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {editingPatient ? "Edit Patient" : "Add Patient"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <LabeledInput
              label="Name"
              placeholder="Mustermann"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <LabeledInput
              label="First Name"
              placeholder="Max"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {/* Birthdate, gender, etc. */}
          <div>
            <LabeledInput
              label="Birthdate"
              placeholder="Birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor={gender}
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <InlineCheckboxGroup
              options={["M", "W", ""]}
              selected={gender}
              onChange={(newSelected) =>
                setGender(newSelected as "M" | "W" | "")
              }
            />
          </div>
          <div>
            <LabeledInput
              label="Nationality"
              placeholder="CH"
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            />
          </div>
          <div>
            <LabeledInput
              label="Address"
              placeholder="Musterstrasse 100"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <LabeledInput
              label="Postal Code"
              placeholder="3294"
              type="number"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div>
            <LabeledInput
              label="City"
              placeholder="Bern"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {/* etc. for nationality, address, postalCode, city, insuranceNumber, ahvNumber */}
          <div>
            <LabeledInput
              label="Insurance number"
              placeholder="Placeholder"
              value={insuranceNumber}
              onChange={(e) => setInsuranceNumber(e.target.value)}
            />
          </div>
          <div>
            <LabeledInput
              label="AHV number"
              placeholder="12341234"
              type="number"
              value={ahvNumber}
              onChange={(e) => setAhvNumber(e.target.value)}
            />
          </div>
          {/* ... more fields ... */}

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{editingPatient ? "Update" : "Save"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
