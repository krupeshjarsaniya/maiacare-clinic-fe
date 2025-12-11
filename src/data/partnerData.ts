export interface BloodPressure {
  systolic: number;
  diastolic: number;
}
export interface PhysicalAssessment {
  date: string;
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string;
  bloodPressure: string;
  heartRate: string;
}

export interface PartnerData {
  profile: {
    name: string;
    gender: string;
    age: string;
    mobile: string;
    email: string;
  };
  medicalHistory: {
    currentMedication: string;
    surgeries: string;
    medicalConditionAllergies: string[];
    familyMedicalHistory: string[];
    medicalCondition: string[];
    lifestyle: string[];
    exercise: string;
    stressLevel: string;
  };
  physicalAssessments: PhysicalAssessment[];
  fertilityAssessment: {
    semenAnalysis: string;
    fertilityIssues: string;
    fertilityTreatment: string;
    surgeries: string;
  };
}

export const partnerData: PartnerData = {
  profile: {
    name: "Raj Desai",
    gender: "Male",
    age: "31",
    mobile: "12345 67890",
    email: "riyadharang@miacare.com",
  },
  medicalHistory: {
    currentMedication: "CureAll 5000, HealMax Plus",
    surgeries: "No",
    medicalConditionAllergies: ["PCOS", "Thyroid Disorder", "Peanut Allergy", "Lactose Intolerant"],
    medicalCondition: ["PCOS", "Thyroid Disorder", "Peanut Allergy", "Lactose Intolerant"],
    
    familyMedicalHistory: ["Mother had endometriosis", "Father had thyroid"],
    lifestyle: ["Non-smoker", "Occasional alcohol", "Vegetarian diet"],
    exercise: "never",
    stressLevel: "low",
  },
  physicalAssessments: [
    {
      date: "Wed, 19 Feb 2024",
      height: "5'4''(162cm)",
      weight: "58 kg",
      bmi: "22.1(Normal)",
      bloodGroup: "O+",
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
    },
    {
      date: "Mon, 22 Feb 2024",
      height: "5'4''(162cm)",
      weight: "58 kg",
      bmi: "22.1(Normal)",
      bloodGroup: "O+",
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
    },
  ],
  fertilityAssessment: {
    semenAnalysis: "Yes | Healthy Semen",
    fertilityIssues: "No",
    fertilityTreatment: "No",
    surgeries: "No",
  }
};
