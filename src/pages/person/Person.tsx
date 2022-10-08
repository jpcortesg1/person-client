import axios from "axios";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import BasicForm from "../../components/forms/BasicForm";
import Layout from "../../components/layouts/Layout";
import { updatePerson } from "../../features/persons/personSlice";
import { Person } from "../../interfaces/person/Person";

export default function PersonPag() {
  const param = useParams();
  const id = param.id;
  const persons = useSelector((state: RootState) => state.persons);
  let person;
  if (id) {
    person = persons.find((person) => person.id === parseInt(id));
  }
  const [form, setForm] = useState({
    name: person?.name || "",
    last_name: person?.last_name || "",
    document_type: person?.document_type || "CC",
    document_number: person?.document_number || "",
    hobbies: person?.hobbies || "",
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
      const res = await axios.patch(
        `https://django-person-crud.onrender.com/api/person/${id}/`,
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
      dispatch(updatePerson(data));
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
      <h1 className="title">Update Person</h1>

      <BasicForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
        loading={loading}
        submitLabel="Update"
        types={types}
      />
    </Layout>
  );
}
