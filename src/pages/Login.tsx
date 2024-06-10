import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import {
  signupFailure,
  signupStart,
  signupSuccess,
  updateUser,
} from "@/redux/authSlice";
import { postData, getData } from "../../global/server";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const checkAuth = async () => {
      if (token && userId) {
        try {
          const response = await getData(`/api/user/find/${userId}`, token);
          dispatch(updateUser({ token, user: response }));
          navigate("/product");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSignUp = async () => {
    dispatch(signupStart());
    try {
      await postData(
        "/api/auth/phone-login",
        { phone: `+91${phoneNumber}` },
        null,
        null
      );
      dispatch(signupSuccess());

      navigate("/verify", {
        state: {
          phoneNumber: `+91${phoneNumber}`,
        },
      });
    } catch (err) {
      dispatch(signupFailure(err));
      console.log(err);
    }
  };

  return (
    <div className="mx-auto max-w-[450px] min-h-screen space-y-6 flex flex-col justify-center">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Get Started as an Admin</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your phone number to continue
        </p>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="1234567890"
              required
              type="tel"
            />
          </div>
          <Button className="w-full" onClick={handleSignUp} type="submit">
            Get OTP
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
