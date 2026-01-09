import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    profilePhoto: null,   // ✅ renamed from file
  });

  const { loading, user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= CHANGE HANDLERS ================= */
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, profilePhoto: e.target.files?.[0] });
  };

  /* ================= SUBMIT ================= */
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto); // ✅ MUST MATCH MULTER
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  /* ================= REDIRECT IF LOGGED IN ================= */
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div>
      <Navbar />

      <div className="flex min-h-[85vh] items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border"
        >
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center">Create Account 🚀</h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            Join JobPortal and start your career journey
          </p>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                name="fullname"
                value={input.fullname}
                onChange={changeHandler}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeHandler}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeHandler}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeHandler}
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          {/* Role + Profile Photo */}
          <div className="mt-6 flex items-center justify-between">
            <RadioGroup className="flex gap-4">
              {["student", "recruiter"].map((r) => (
                <label key={r} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={input.role === r}
                    onChange={changeHandler}
                    className="accent-[#6A38C2]"
                    required
                  />
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </label>
              ))}
            </RadioGroup>

            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="w-36 cursor-pointer"
            />
          </div>

          {/* Button */}
          <div className="mt-8">
            {loading ? (
              <Button className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                Sign Up
              </Button>
            )}
          </div>

          {/* Footer text */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6A38C2] font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
