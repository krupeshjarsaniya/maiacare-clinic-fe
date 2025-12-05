import React, { useState } from "react";
import { InputFieldGroup } from "../ui/InputField";
import { MdMailOutline } from "react-icons/md";
import { BiHide, BiLockAlt, BiShow } from "react-icons/bi";
import Button from "../ui/Button";
import "../../style/login.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setTokenInCookie } from "@/utlis/Helper";
import { useDispatch } from "react-redux";
import { login } from "@/utlis/apis/apiHelper";
import { setAuthData } from "@/utlis/redux/slices/authSlice";

import { setToken } from "@/utlis/redux/slices/tokenSlice";
export function LoginForms() {
  const [showPassword, setShowPassword] = useState(false);
  const [maskedValue, setMaskedValue] = useState("");
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const defaultFormValue = {
    email: "",
    password: "",
  };

  const defaultFormError = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(defaultFormValue);
  const [formError, setFormError] = useState(defaultFormError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError({ ...formError, [name]: "" });

    if (name === "password") {
      // setMaskedValue(value.replace(/./g, "*").slice(0, value.length));
      setMaskedValue(value.replace(/./g, "*"));
    }
  };

  const validateForm = () => {
    const errors: typeof defaultFormError = { ...defaultFormError };
    let isValid = true;
    // const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/;

    if (formData.password.trim() === "") {
      errors.password = "Password is required";
      isValid = false;
    }
    if (formData.email.trim() === "") {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }
    setFormError(errors);
    return isValid;
  };
  const router = useRouter();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      login(formData)
        .then((response) => {
          if (response.status) {
            toast.success(response?.data?.message || "Login successful!");
            console.log("response", response);
            // Save token
            const token = response?.data?.token;
            localStorage.setItem("token", token);
            setTokenInCookie(token);
            dispatch(setToken(token));
            dispatch(setAuthData(response?.data?.data.doctor));
            router.push("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setFormError(defaultFormError);
      // router.push("/selectprofile");
    }
  };

  return (  
    <div>
      <form onSubmit={handleFormSubmit}>
        <InputFieldGroup
          type="text"
          value={formData.email}
          name="email"
          onChange={handleChange}
          error={formError.email}
          label="Email Address"
          placeholder="doctor@maiacare.com"
          required={true}
          className={`position-relative  input-email-login-data mt-4`}
        >
          {/* <MdMailOutline size={24} className='input-email-data' /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="input-email-data"
            width="24"
            height="24"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M18.1003 3.89844H3.10034C2.8517 3.89844 2.61324 3.99721 2.43743 4.17302C2.26161 4.34884 2.16284 4.5873 2.16284 4.83594V15.4609C2.16284 15.8753 2.32746 16.2728 2.62049 16.5658C2.91351 16.8588 3.31094 17.0234 3.72534 17.0234H17.4753C17.8897 17.0234 18.2872 16.8588 18.5802 16.5658C18.8732 16.2728 19.0378 15.8753 19.0378 15.4609V4.83594C19.0378 4.5873 18.9391 4.34884 18.7633 4.17302C18.5874 3.99721 18.349 3.89844 18.1003 3.89844ZM15.6902 5.77344L10.6003 10.4391L5.5105 5.77344H15.6902ZM4.03784 15.1484V6.96719L9.96675 12.4023C10.1397 12.5609 10.3657 12.6489 10.6003 12.6489C10.8349 12.6489 11.061 12.5609 11.2339 12.4023L17.1628 6.96719V15.1484H4.03784Z"
              fill="#2B4360"
            />
          </svg>
        </InputFieldGroup>
        <div className="pt-3">
          {/* <InputFieldGroup
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        placeholder="********"
                        required={true}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={formError.password}
                        className="position-relative input-email-login-data"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="input-email-data" width="24" height="24" viewBox="0 0 25 25" fill="none">
                            <path d="M16.8503 6.39844H14.6628V4.83594C14.6628 3.7585 14.2348 2.72518 13.473 1.96332C12.7111 1.20145 11.6778 0.773438 10.6003 0.773438C9.5229 0.773438 8.48959 1.20145 7.72772 1.96332C6.96585 2.72518 6.53784 3.7585 6.53784 4.83594V6.39844H4.35034C3.93594 6.39844 3.53851 6.56306 3.24549 6.85608C2.95246 7.14911 2.78784 7.54654 2.78784 7.96094V16.7109C2.78784 17.1253 2.95246 17.5228 3.24549 17.8158C3.53851 18.1088 3.93594 18.2734 4.35034 18.2734H16.8503C17.2647 18.2734 17.6622 18.1088 17.9552 17.8158C18.2482 17.5228 18.4128 17.1253 18.4128 16.7109V7.96094C18.4128 7.54654 18.2482 7.14911 17.9552 6.85608C17.6622 6.56306 17.2647 6.39844 16.8503 6.39844ZM8.41284 4.83594C8.41284 4.25578 8.64331 3.69938 9.05355 3.28914C9.46378 2.87891 10.0202 2.64844 10.6003 2.64844C11.1805 2.64844 11.7369 2.87891 12.1471 3.28914C12.5574 3.69938 12.7878 4.25578 12.7878 4.83594V6.39844H8.41284V4.83594ZM16.5378 16.3984H4.66284V8.27344H16.5378V16.3984Z" fill="#2B4360" />
                        </svg>

                        <span
                            onClick={togglePasswordVisibility}
                            className="position-absolute  end-0 translate-middle-y me-3 cursor-pointer passwored-btn-icon"
                            style={{ zIndex: 8 }}
                        >
                            {showPassword ? <BiShow size={20} className='passwored-eye-icon eye-color' /> : <BiHide size={20} className='passwored-eye-icon eye-color' />}

                        </span>
                    </InputFieldGroup> */}

          <InputFieldGroup
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="********"
            required={true}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={formError.password}
            className="position-relative  input-email-login-data login-password-data"
          >
            {/* <BiLockAlt size={24} className="input-email-data" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="input-email-data"
              width="24"
              height="24"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M16.8503 6.39844H14.6628V4.83594C14.6628 3.7585 14.2348 2.72518 13.473 1.96332C12.7111 1.20145 11.6778 0.773438 10.6003 0.773438C9.5229 0.773438 8.48959 1.20145 7.72772 1.96332C6.96585 2.72518 6.53784 3.7585 6.53784 4.83594V6.39844H4.35034C3.93594 6.39844 3.53851 6.56306 3.24549 6.85608C2.95246 7.14911 2.78784 7.54654 2.78784 7.96094V16.7109C2.78784 17.1253 2.95246 17.5228 3.24549 17.8158C3.53851 18.1088 3.93594 18.2734 4.35034 18.2734H16.8503C17.2647 18.2734 17.6622 18.1088 17.9552 17.8158C18.2482 17.5228 18.4128 17.1253 18.4128 16.7109V7.96094C18.4128 7.54654 18.2482 7.14911 17.9552 6.85608C17.6622 6.56306 17.2647 6.39844 16.8503 6.39844ZM8.41284 4.83594C8.41284 4.25578 8.64331 3.69938 9.05355 3.28914C9.46378 2.87891 10.0202 2.64844 10.6003 2.64844C11.1805 2.64844 11.7369 2.87891 12.1471 3.28914C12.5574 3.69938 12.7878 4.25578 12.7878 4.83594V6.39844H8.41284V4.83594ZM16.5378 16.3984H4.66284V8.27344H16.5378V16.3984Z"
                fill="#2B4360"
              />
            </svg>

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="position-absolute  end-0 translate-middle-y me-3 cursor-pointer passwored-btn-icon"
              style={{ zIndex: 8 }}
            >
              {showPassword ? (
                <BiShow size={20} className="passwored-eye-icon eye-color" />
              ) : (
                <BiHide size={20} className="passwored-eye-icon eye-color" />
              )}
            </span>
          </InputFieldGroup>
        </div>

        <div className="d-flex justify-content-end mb-3">
          <a
            onClick={() => router.push("/forgotppassword")}
            className="input-forrgot-password  mt-2"
          >
            Forgot Password
          </a>
        </div>

        <Button className="w-100 input-forgot-password-btn" type="submit">
          {" "}
          Sign In
        </Button>
      </form>
    </div>
  );
}

export function ForgotPassword() {
  const defaultFormValue = {
    email: "",
  };

  const defaultFormError = {
    email: "",
  };

  const [data, setData] = useState(defaultFormValue);
  const [formError, setFormError] = useState(defaultFormError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: "" });
  };

  const validateForm = () => {
    const errors: typeof defaultFormError = { ...defaultFormError };
    let isValid = true;
    // const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/;

    if (data.email.trim() === "") {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    setFormError(errors);
    return isValid;
  };

  const router = useRouter();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Form Submitted");
      router.push("/verificationcode");
      setFormError(defaultFormError);
      console.log(data);
      localStorage.setItem("useremail", data.email);
    }
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <InputFieldGroup
          type="text"
          value={data.email}
          name="email"
          onChange={handleChange}
          error={formError.email}
          label="Email Address"
          placeholder="doctor@maiacare.com"
          required={true}
          className={`position-relative  input-email-login-data mt-4`}
        >
          {/* <MdMailOutline size={24} className='input-email-data' /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="input-email-data"
            width="24"
            height="24"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M18.1003 3.89844H3.10034C2.8517 3.89844 2.61324 3.99721 2.43743 4.17302C2.26161 4.34884 2.16284 4.5873 2.16284 4.83594V15.4609C2.16284 15.8753 2.32746 16.2728 2.62049 16.5658C2.91351 16.8588 3.31094 17.0234 3.72534 17.0234H17.4753C17.8897 17.0234 18.2872 16.8588 18.5802 16.5658C18.8732 16.2728 19.0378 15.8753 19.0378 15.4609V4.83594C19.0378 4.5873 18.9391 4.34884 18.7633 4.17302C18.5874 3.99721 18.349 3.89844 18.1003 3.89844ZM15.6902 5.77344L10.6003 10.4391L5.5105 5.77344H15.6902ZM4.03784 15.1484V6.96719L9.96675 12.4023C10.1397 12.5609 10.3657 12.6489 10.6003 12.6489C10.8349 12.6489 11.061 12.5609 11.2339 12.4023L17.1628 6.96719V15.1484H4.03784Z"
              fill="#2B4360"
            />
          </svg>
        </InputFieldGroup>

        <Button className="w-100 input-forgot-password-btn mt-4" type="submit">
          {" "}
          Submit
        </Button>
      </form>
    </div>
  );
}

export function ResetPasswordScreen({
  setPasswordChangedSuccessModel,
}: {
  setPasswordChangedSuccessModel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newshowPassword, setNewShowPassword] = useState(false);
  const [confirmshowPassword, setConfirmShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setNewShowPassword((prev) => !prev);
    setConfirmShowPassword((prev) => !prev);
  };

  const defaultFormValue = {
    newpassword: "",
    confirmpassword: "",
  };

  const defaultFormError = {
    newpassword: "",
    confirmpassword: "",
  };

  const [formData, setFormData] = useState(defaultFormValue);
  const [formError, setFormError] = useState(defaultFormError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError({ ...formError, [name]: "" });
  };

  const validateForm = () => {
    const errors: typeof defaultFormError = { ...defaultFormError };
    let isValid = true;

    if (formData.newpassword.trim() === "") {
      errors.newpassword = "New Password is required";
      isValid = false;
    } else if (formData.newpassword.length < 8) {
      errors.newpassword = "Minimum 8 characters";
      isValid = false;
    } else if (!/(?=.*[a-z])/.test(formData.newpassword)) {
      errors.newpassword = "At least one lowercase letter";
      isValid = false;
    } else if (!/(?=.*[A-Z])/.test(formData.newpassword)) {
      errors.newpassword = "At least one uppercase letter";
      isValid = false;
    } else if (!/(?=.*\d)/.test(formData.newpassword)) {
      errors.newpassword = "At least one number";
      isValid = false;
    } else if (
      !/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.newpassword)
    ) {
      errors.newpassword = "At least one special character (e.g., !@#$%^&*)";
      isValid = false;
    } else if (formData.newpassword !== formData.confirmpassword) {
      errors.confirmpassword = "New Password and Confirm Password do not match";
      isValid = false;
    }
    setFormError(errors);
    return isValid;
  };
  const router = useRouter();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Form Submitted");
      //  router.push("/"); // set route in success model
      setFormError(defaultFormError);
      setPasswordChangedSuccessModel(true);
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="pt-3">
          <InputFieldGroup
            type={newshowPassword ? "text" : "password"}
            label="New Password"
            placeholder="********"
            required={true}
            name="newpassword"
            value={formData.newpassword}
            onChange={handleChange}
            error={formError.newpassword}
            className="position-relative  input-email-login-data"
          >
            {/* <BiLockAlt size={24} className="input-email-data" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="input-email-data"
              width="24"
              height="24"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M16.8503 6.39844H14.6628V4.83594C14.6628 3.7585 14.2348 2.72518 13.473 1.96332C12.7111 1.20145 11.6778 0.773438 10.6003 0.773438C9.5229 0.773438 8.48959 1.20145 7.72772 1.96332C6.96585 2.72518 6.53784 3.7585 6.53784 4.83594V6.39844H4.35034C3.93594 6.39844 3.53851 6.56306 3.24549 6.85608C2.95246 7.14911 2.78784 7.54654 2.78784 7.96094V16.7109C2.78784 17.1253 2.95246 17.5228 3.24549 17.8158C3.53851 18.1088 3.93594 18.2734 4.35034 18.2734H16.8503C17.2647 18.2734 17.6622 18.1088 17.9552 17.8158C18.2482 17.5228 18.4128 17.1253 18.4128 16.7109V7.96094C18.4128 7.54654 18.2482 7.14911 17.9552 6.85608C17.6622 6.56306 17.2647 6.39844 16.8503 6.39844ZM8.41284 4.83594C8.41284 4.25578 8.64331 3.69938 9.05355 3.28914C9.46378 2.87891 10.0202 2.64844 10.6003 2.64844C11.1805 2.64844 11.7369 2.87891 12.1471 3.28914C12.5574 3.69938 12.7878 4.25578 12.7878 4.83594V6.39844H8.41284V4.83594ZM16.5378 16.3984H4.66284V8.27344H16.5378V16.3984Z"
                fill="#2B4360"
              />
            </svg>

            <span
              onClick={() => setNewShowPassword(!newshowPassword)}
              className="position-absolute  end-0 translate-middle-y me-3 cursor-pointer passwored-btn-icon"
              style={{ zIndex: 8 }}
            >
              {newshowPassword ? (
                <BiShow size={20} className="passwored-eye-icon eye-color" />
              ) : (
                <BiHide size={20} className="passwored-eye-icon eye-color" />
              )}
            </span>
          </InputFieldGroup>
        </div>
        <div className="pt-3">
          <InputFieldGroup
            type={confirmshowPassword ? "text" : "password"}
            label="Confirm Password"
            placeholder="********"
            required={true}
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            error={formError.confirmpassword}
            className="position-relative  input-email-login-data "
          >
            {/* <BiLockAlt size={24} className="input-email-data" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="input-email-data"
              width="24"
              height="24"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M16.8503 6.39844H14.6628V4.83594C14.6628 3.7585 14.2348 2.72518 13.473 1.96332C12.7111 1.20145 11.6778 0.773438 10.6003 0.773438C9.5229 0.773438 8.48959 1.20145 7.72772 1.96332C6.96585 2.72518 6.53784 3.7585 6.53784 4.83594V6.39844H4.35034C3.93594 6.39844 3.53851 6.56306 3.24549 6.85608C2.95246 7.14911 2.78784 7.54654 2.78784 7.96094V16.7109C2.78784 17.1253 2.95246 17.5228 3.24549 17.8158C3.53851 18.1088 3.93594 18.2734 4.35034 18.2734H16.8503C17.2647 18.2734 17.6622 18.1088 17.9552 17.8158C18.2482 17.5228 18.4128 17.1253 18.4128 16.7109V7.96094C18.4128 7.54654 18.2482 7.14911 17.9552 6.85608C17.6622 6.56306 17.2647 6.39844 16.8503 6.39844ZM8.41284 4.83594C8.41284 4.25578 8.64331 3.69938 9.05355 3.28914C9.46378 2.87891 10.0202 2.64844 10.6003 2.64844C11.1805 2.64844 11.7369 2.87891 12.1471 3.28914C12.5574 3.69938 12.7878 4.25578 12.7878 4.83594V6.39844H8.41284V4.83594ZM16.5378 16.3984H4.66284V8.27344H16.5378V16.3984Z"
                fill="#2B4360"
              />
            </svg>

            <span
              onClick={() => setConfirmShowPassword(!confirmshowPassword)}
              className="position-absolute  end-0 translate-middle-y me-3 cursor-pointer passwored-btn-icon"
              style={{ zIndex: 8 }}
            >
              {confirmshowPassword ? (
                <BiShow size={20} className="passwored-eye-icon eye-color" />
              ) : (
                <BiHide size={20} className="passwored-eye-icon eye-color" />
              )}
            </span>
          </InputFieldGroup>
        </div>

        <Button className="w-100 input-forgot-password-btn mt-4" type="submit">
          Reset Password
        </Button>
      </form>
    </>
  );
}

export function VerifyOtp() {
  const defaultFormValue = {
    number: "",
  };

  const defaultFormError = {
    number: "",
  };

  const [formData, setFormData] = useState(defaultFormValue);
  const [formError, setFormError] = useState(defaultFormError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError({ ...formError, [name]: "" });
  };

  const validateForm = () => {
    const errors: typeof defaultFormError = { ...defaultFormError };
    let isValid = true;

    if (!formData.number) {
      errors.number = "Verification Code is required";
      isValid = false;
    } else if (formData.number.length === 123456) {
      errors.number = "Welcome";
      // errors.number = "Please enter valid code";
      isValid = false;
    }
    setFormError(errors);
    return isValid;
  };
  const router = useRouter();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      if (formData.number !== "123456") {
        alert("Please enter valid code");
        return;
      }
      alert("Form Submitted");
      router.push("/resetpassword");
      setFormError(defaultFormError);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <InputFieldGroup
          type="text"
          value={formData.number}
          name="number"
          onChange={(e) => {
            const onlyDigits = e.target.value.replace(/\D/g, ""); // Remove non-digits
            setFormData({ ...formData, number: onlyDigits });
            setFormError({ ...formError, number: "" });
          }}
          error={formError.number}
          label="Verification Code"
          placeholder="Enter 6-digit code"
          required={true}
          maxLength={6}
          className={`position-relative mt-4`}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
            if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
              e.preventDefault();
            }
          }}
        />

        <Button className="w-100 input-forgot-password-btn mt-4" type="submit">
          {" "}
          Verify
        </Button>
      </form>
    </div>
  );
}
