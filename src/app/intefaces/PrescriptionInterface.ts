export interface PrescriptionInterface {
  appointment_id: null | number;
  notes: string;
  items: PrescriptionItemInterface[];
}

export interface PrescriptionItemInterface {
  id?: number;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
}
