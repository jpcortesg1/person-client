import AuthLayout from "../../components/layouts/AuthLayout";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as loginDispatch } from "../../features/auth/authSlice";
import BasicForm from "../../components/forms/BasicForm";
import "./styles.css";

export default function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post(" http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      const data = res.data;
      dispatch(loginDispatch({ ...data }));
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(() => true);
    await login(form.username, form.password);
    setLoading(() => false);
  };

  return (
    <AuthLayout>
      <h1 className="title">Login</h1>

      <BasicForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
        loading={loading}
        submitLabel="Login"
      />
    </AuthLayout>
  );
}
