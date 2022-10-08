import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import BasicCard from "../../components/cards/BasicCard";
import Layout from "../../components/layouts/Layout";
import { fillPersons } from "../../features/persons/personSlice";
import { Person } from "../../interfaces/person/Person";

import "./styles.css";

export default function Home() {
  const dispatch = useDispatch();
  const { access } = useSelector((store: RootState) => store.auth);
  const persons = useSelector((store: RootState) => store.persons);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://django-person-crud.onrender.com/api/person/"
        );
        const data: Person[] = response.data;
        dispatch(fillPersons(data));
      } catch (error) {}
    };
    getData();
  }, [access, dispatch]);

  return (
    <Layout>
      <h1 className="title">Persons</h1>

      <div className="home__persons">
        {persons.map((person) => (
          <BasicCard key={person.id} person={person} />
        ))}
      </div>
    </Layout>
  );
}
