import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ normalize role safely
  const role = user?.role ? user.role.toLowerCase() : "";

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </Link>

          {/* NAV LINKS */}
          <nav className="flex items-center gap-6 font-medium">
            {user ? (
              role === "recruiter" ? (
                <>
                  <Link to="/admin/companies">Companies</Link>
                  <Link to="/admin/jobs">Jobs</Link>
                </>
              ) : (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/jobs">Jobs</Link>
                  <Link to="/browse">Browse</Link>
                </>
              )
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/browse">Browse</Link>
              </>
            )}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <button>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>
                        {user?.fullname?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-72 p-4">
                  <div className="flex items-center gap-3 border-b pb-3">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>
                        {user?.fullname?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">
                        {user?.fullname}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {user?.profile?.bio || "No bio available"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-2 text-sm">
                    {role === "student" && (
                      <Link to="/profile" className="flex items-center gap-2">
                        <User2 className="h-4 w-4" />
                        <span>View Profile</span>
                      </Link>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
