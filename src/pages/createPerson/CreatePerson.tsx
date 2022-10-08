import axios from "axios";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BasicForm from "../../components/forms/BasicForm";
import Layout from "../../components/layouts/Layout";
import { addPerson } from "../../features/persons/personSlice";
import { Person } from "../../interfaces/person/Person";

export default function CreatePerson() {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    document_type: "CC",
    document_number: "",
    hobbies: "",
  });
  const navigate = useNavigate();

  const types = {
    document_type: {
      CC: "Cédula de Ciudadanía",
      CE: "Cédula de Extranjería",
      TI: "Tarjeta de Identidad",
      RC: "Registro Civil",
      PA: "Pasaporte",
      MS: "Menor Sin Identificación",
      AS: "Adulto Sin Identificación",
      NI: "NIT",
      NU: "Número Único de Identificación",
      OT: "Otro",
    },
  };
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigation = (uri: string) => {
    navigate(uri);
  };

  const createPerson = async () => {
    try {
      const access = localStorage.getItem("access");
      const res = await axios.post(
        "http://127.0.0.1:8000/api/person/",
        {
          ...form,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      const data: Person = res.data;
      dispatch(addPerson(data));
      navigation("/");
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(() => true);
    await createPerson();
    setLoading(() => false);
  };

  return (
    <Layout>
      <h1 className="title">Create Person</h1>

      <BasicForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
        loading={loading}
        submitLabel="Create"
        types={types}
      />
    </Layout>
  );
}
