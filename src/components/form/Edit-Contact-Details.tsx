import React, { useEffect, useState } from "react";
import ContentContainer from "../ui/ContentContainer";
import { InputFieldGroup } from "../ui/InputField";
import { Col, Form, Row } from "react-bootstrap";
import Button from "../ui/Button";
import { PhoneNumberInput } from "../ui/PhoneNumberInput";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { clinicConatctData } from "@/utlis/StaticData";
import { ContactPerson } from "@/utlis/types/interfaces";

export default function EditContactDetails({
  onNext,
  onPrevious,
  data,
  onChange,
}: {
  onNext: (payload: ContactPerson) => void;
  onPrevious: () => void;
  data: ContactPerson | null;
  onChange: (data: ContactPerson) => void;
}) {
  const router = useRouter();

  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};

  const [formError, setFormError] = useState<FormError>(initialFormError);
  type FormData = {
    Name: string;
    Contact: string;
    Email: string;
    Adcard: string;
  };

  const initialFormData: FormData = {
    Name: "",
    Contact: "",
    Adcard: "",
    Email: "",
  };
  const formatAadhaar = (value: string) => {
    return value
      .replace(/\D/g, "") // remove non-digits
      .slice(0, 12) // max 12 digits
      .replace(/(\d{4})(?=\d)/g, "$1 "); // add space after every 4 digits
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};
    if (!data.Adcard.trim()) {
      errors.Adcard = "Aadhar  card number is required";
    } else {
      const rawValue = data.Adcard.replace(/\s/g, ""); // remove spaces

      if (rawValue.length < 12) {
        errors.Adcard = "Aadhar card number must be 12 digits";
      }
    }
    if (!data.Name.trim()) errors.Name = "Name is required";
    // contact error
    const contactRegex = /^[0-9]{10}$/;
    if (!data.Contact.trim()) {
      errors.Contact = "Contact number is required";
    } else if (!contactRegex.test(data.Contact)) {
      errors.Contact = "Please enter a valid 10-digit number";
    }
    // email error
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.Email.trim()) {
      errors.Email = "Email is required";
    } else if (!emailRegex.test(data.Email)) {
      errors.Email = "Enter a valid email address";
    }
    return errors;
  };

  // const handleSaveChange = () => {
  //   const errors = validateForm(formData);
  //   setFormError(errors);

  //   if (Object.keys(errors).length === 0) {
  //     onChange({
  //       name: formData.Name,
  //       contactNumber: formData.Contact,
  //       email: formData.Email,
  //       aadharNumber: formData.Adcard,
  //     });
  //     console.log("contact:-", onchange);

  //     onNext();
  //   }
  // };
  const handleSaveChange = () => {
    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      const payload: ContactPerson = {
        name: formData.Name,
        contactNumber: formData.Contact,
        email: formData.Email,
        aadharNumber: formData.Adcard,
      };

      onChange(payload);
      onNext(payload); // ✅ pass data directly
    }
  };

  useEffect(() => {
    if (!data) return;

    setFormData({
      Name: data.name ?? "",
      Contact: data.contactNumber ?? "",
      Adcard: data.aadharNumber ?? "",
      Email: data.email ?? "",
    });
  }, [data?.name, data?.contactNumber, data?.email, data?.aadharNumber]);

  return (
    <div>
      <ContentContainer className="mt-3">
        <div>
          <h5 className="profile-card-main-titile">Contact Person Details</h5>
          <Row>
            <Col className="mt-3 " md={6}>
              <InputFieldGroup
                label="Name"
                name="Name"
                type="text"
                value={formData.Name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Name: e.target.value });
                  if (formError.Name) {
                    // typing in hide error
                    setFormError({ ...formError, Name: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Name"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Name}
                className="position-relative "
              ></InputFieldGroup>
            </Col>
            <Col md={6} className="mt-3">
              <PhoneNumberInput
                label="Contact Number"
                value={formData.Contact}
                inputMode="numeric"
                onChange={(phone: string) => {
                  // ✅ Remove any non-digit character
                  let value = phone.replace(/\D/g, "");

                  // ✅ Allow only max 10 digits
                  if (value.length > 10) {
                    value = value.slice(0, 10);
                  }

                  // ✅ Update formData
                  setFormData({ ...formData, Contact: value });

                  // ✅ Hide error while typing
                  if (formError.Contact) {
                    setFormError({ ...formError, Contact: "" });
                  }
                }}
                required
                error={formError.Contact}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mt-3">
              <InputFieldGroup
                label="Email ID"
                name="Email"
                type="text"
                value={formData.Email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Email: e.target.value });
                  if (formError.Email) {
                    // typing in hide error
                    setFormError({ ...formError, Email: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Email"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Email}
                className="position-relative"
              ></InputFieldGroup>
            </Col>
            <Col md={6} sm={12} className="mt-3">
              <InputFieldGroup
                label="Aadhar Number"
                name="Aadhar"
                type="text"
                value={formatAadhaar(formData.Adcard)} // Aadhaar formatting (xxxx xxxx xxxx)
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const rawValue = e.target.value;

                  // only didgit type
                  let value = rawValue.replace(/\D/g, "");

                  // only 12 digit enter
                  if (value.length > 12) {
                    value = value.slice(0, 12);
                  }

                  setFormData({ ...formData, Adcard: value });

                  // only digit type validtation msg hide
                  if (/^\d+$/.test(rawValue)) {
                    if (formError.Adcard) {
                      setFormError({ ...formError, Adcard: "" });
                    }
                  }
                }}
                placeholder="Aadhar Number"
                required
                error={formError.Adcard}
                className="position-relative"
              />
            </Col>
          </Row>
        </div>
      </ContentContainer>
      <div className="d-flex justify-content-end mt-4 gap-3">
        <Button
          variant="dark"
          className="maiacare-button edit-profile-btn"
          onClick={onPrevious}
        >
          <ArrowLeft size={16} /> Previous
        </Button>
        <Button
          variant="dark"
          className="maiacare-button common-btn-blue"
          onClick={handleSaveChange} // navigate
        >
          Save
        </Button>
      </div>
    </div>
  );
}
