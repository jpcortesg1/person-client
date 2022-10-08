import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Person } from "../../interfaces/person/Person";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removePerson } from "../../features/persons/personSlice";

interface BasicCardProps {
  person: Person;
}

export default function BasicCard({ person }: BasicCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigation = (id: number) => {
    navigate(`/person/${id}`);
  };

  const handleDelete = async () => {
    try {
      const access = localStorage.getItem("access");
      await axios.delete(
        `https://django-person-crud.onrender.com/api/person/${person.id}/`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      dispatch(removePerson(person.id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card sx={{ maxWidth: 300, minWidth: 300 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {person.document_type + ": " + person.document_number}
        </Typography>
        <Typography variant="h5" component="div">
          {person.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {person.last_name}
        </Typography>
        <Typography variant="body2">{person.hobbies}</Typography>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Button size="small" onClick={() => navigation(person.id)}>
          Edit
        </Button>
        <Button size="small" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
