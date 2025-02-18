"use client";

import { LabeledInput } from "@/components/ui/labeled-input";
import { Patient, ProjectData } from "../CreateProjectPage";
import { InlineCheckboxGroup } from "@/components/ui/inline-checkbox-group";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddPatientModal } from "@/components/PatientModal";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

interface OperationLogProps {
  data: ProjectData;
  onUpdateField: <K extends keyof ProjectData>(
    field: K,
    value: ProjectData[K]
  ) => void;
}

export const StepOperationLog: FC<OperationLogProps> = ({
  data,
  onUpdateField,
}) => {
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [editingPatientIndex, setEditingPatientIndex] = useState<number | null>(
    null
  );

  // 1) When we add a new patient
  const handleAddPatient = (newPatient: Patient) => {
    onUpdateField("patients", [...data.patients, newPatient]);
  };

  // 2) When we edit an existing patient
  const handleUpdatePatient = (index: number, updatedPatient: Patient) => {
    const newPatients = [...data.patients];
    newPatients[index] = updatedPatient;
    onUpdateField("patients", newPatients);
  };

  // 3) Delete a patient from the array
  const handleDeletePatient = (index: number) => {
    const newPatients = [...data.patients];
    newPatients.splice(index, 1); // remove 1 item at 'index'
    onUpdateField("patients", newPatients);
  };

  // Open the modal in "edit" mode with the data from that patient index
  const handleEditClick = (index: number) => {
    setEditingPatientIndex(index);
    setShowPatientModal(true);
  };

  // Called when the modal is closed (whether adding or editing)
  const handleCloseModal = () => {
    setShowPatientModal(false);
    setEditingPatientIndex(null);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Operation log</h2>
      <div className="flex flex-col gap-4">
        <LabeledInput
          className="w-1/2"
          label="Project Title"
          value={data.title}
          onChange={(e) => onUpdateField("title", e.target.value)}
        />
        <hr className="my-4" />
        <InlineCheckboxGroup
          options={["ZH", "AG", "PT", "PN", "ST", "SN"]}
          selected={data.canton}
          onChange={(newSelected) => onUpdateField("canton", newSelected)}
        />
        <LabeledInput
          className="w-1/2"
          label="Date"
          type="date"
          value={data.date}
          onChange={(e) => onUpdateField("date", e.target.value)}
        />
        <hr className="my-4" />
        <InlineCheckboxGroup
          options={["HEF", "FU", "B/U", "EX"]}
          selected={data.placeholder}
          onChange={(newSelected) => onUpdateField("placeholder", newSelected)}
        />
        <div className="flex flex-1 gap-8 w-1/2">
          <LabeledInput
            className="flex-grow"
            label="Place of emergency"
            placeholder="Placeholder"
            value={data.placeOfEmergency}
            onChange={(e) => onUpdateField("placeOfEmergency", e.target.value)}
          />
          <LabeledInput
            className="flex-grow"
            label="Location/Postal Code"
            placeholder="Placeholder"
            value={data.locationPostalCode}
            onChange={(e) =>
              onUpdateField("locationPostalCode", e.target.value)
            }
          />
        </div>
        <hr className="my-4" />
        <InlineCheckboxGroup
          options={["Positive", "Negative", "Parallel", "Cancellation"]}
          selected={data.stateOfMind}
          onChange={(newSelected) => onUpdateField("stateOfMind", newSelected)}
        />
        <div className="flex gap-8">
          <LabeledInput
            label="Contact on site"
            placeholder="Placeholder"
            value={data.contact}
            onChange={(e) => onUpdateField("contact", e.target.value)}
          />
          <div className="flex justify-center items-center pt-6">
            <span className="mr-4">Call to:</span>
            <InlineCheckboxGroup
              options={["KAPO ZH", "STAPO Winterthur"]}
              selected={data.callTo}
              onChange={(newSelected) => onUpdateField("callTo", newSelected)}
            />
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-1 gap-8 w-1/2">
          <LabeledInput
            className="flex-grow"
            label="Mission Number"
            placeholder="Placeholder"
            value={data.placeOfEmergency}
            onChange={(e) => onUpdateField("placeOfEmergency", e.target.value)}
          />
          <LabeledInput
            className="flex-grow"
            label="Responsible Doctor"
            placeholder="Placeholder"
            value={data.locationPostalCode}
            onChange={(e) =>
              onUpdateField("locationPostalCode", e.target.value)
            }
          />
        </div>
      </div>
      <hr className="my-8" />
      {/* List existing patients */}
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">Patients</h3>
        {data.patients.length === 0 ? (
          <p className="text-sm text-gray-600">No patients added yet.</p>
        ) : (
          <ul className="space-y-2">
            {data.patients.map((p, idx) => (
              <li key={idx} className="border p-2 rounded">
                <div className="font-semibold">
                  {p.name} {p.firstName} (b. {p.birthdate})
                </div>
                <div className="text-sm text-gray-700">Gender: {p.gender}</div>
                <div className="text-sm text-gray-700">
                  Address: {p.address}, {p.postalCode} {p.city}
                </div>
                <div className="text-sm text-gray-700">
                  Insurance: {p.insuranceNumber}
                </div>
                <div className="text-sm text-gray-700">AHV: {p.ahvNumber}</div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditClick(idx)}
                    icon={<FiEdit className="h-4 w-4" />}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeletePatient(idx)}
                    icon={<FaRegTrashCan className="h-4 w-4" />}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        type="button"
        onClick={() => {
          setEditingPatientIndex(null);
          setShowPatientModal(true);
        }}
      >
        Add Patient
      </Button>
      {showPatientModal && (
        <AddPatientModal
          onClose={handleCloseModal}
          // If editing, pass the existing patient data + an onUpdate callback
          editingPatient={
            editingPatientIndex !== null
              ? data.patients[editingPatientIndex]
              : null
          }
          onAddPatient={handleAddPatient}
          onUpdatePatient={
            editingPatientIndex !== null
              ? (updated: Patient) =>
                  handleUpdatePatient(editingPatientIndex, updated)
              : undefined
          }
        />
      )}
    </>
  );
};
