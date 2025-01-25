import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("SignUp");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "SignUp" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "SignUp" ? "sign up" : "login"} to book the
          appointment
        </p>
        <div className="w-full">
          <p>Full Name</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.name)}
            value={name}
            required
          />
        </div>
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.email)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setName(e.target.password)}
            value={password}
            required
          />
        </div>
        <button>{state === "SignUp" ? "Create Account" : "Login"}</button>
      </div>
    </form>
  );
};

export default Login;
