"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { datatransfer } from "./context";
import { useRouter } from "next/navigation";

const Header = () => {
  const { Login, setLogin, usertype, setusertype } = useContext(datatransfer);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [asignemploy,setasignemploy]=useState({
    name:'',
    email:'',
    password:'',
    phoneNo:''
  })
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setLogin(true);
        try {
          const decodedUser = jwtDecode(token);
          if (decodedUser.email == process.env.NEXT_PUBLIC_Email) {
            setusertype(true);
          }
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setLogin(false);
    router.push("/");
  };
  const handledata=(e)=>{
   setasignemploy({...asignemploy,[e.target.name]:e.target.value})
  }
  const handlesubmit=async()=>{
    try {
      const res = await fetch("/api/owner", {
        method: "POST",
        body: JSON.stringify(asignemploy),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result=await res.json();
      setuser(result.data)
      if (!res.ok) {
        throw new Error("Something went wrong.");
      }else{
        localStorage.setItem("token", result.token);

      // Optionally, you can decode the token to get user details
      const decodedUser = JSON.parse(atob(result.token.split('.')[1]));

      setuser(decodedUser);
      setloading(false);
      router.push('/');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-gray-900 p-4 shadow-lg">
      <Link href='/' className="flex items-center space-x-4 mb-4 sm:mb-0">
        <img src="/Alertgroup.png" alt="AlertGroup Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">AlertGroup Admin</h1>
      </Link>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {usertype && (
          <Dialog>
            <DialogTrigger className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Authorize
            </DialogTrigger>
            <DialogContent className="max-w-sm bg-white rounded-lg p-6 shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-800">Authorize</DialogTitle>
                <DialogDescription className="mt-4">
                  <div className="space-y-4">
                  <input
                      type="name"
                      placeholder="Name"
                      name='name'
                      required
                      onChange={handledata}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handledata}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Password minlength6"
                      onChange={handledata}
                      name="password"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     <input
                      type="tel"
                      placeholder="Phone Number"
                      onChange={handledata}
                      name="phoneNo"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={handlesubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      Submit
                    </button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}

        {!token ? (
          
            <Link
              href="/Login"
              className="text-white bg-green-500 px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Login
            </Link>
           
         
        ) : (
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
