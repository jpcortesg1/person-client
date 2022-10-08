import { Person } from "./Person";

export interface CreatePerson
  extends Omit<Person, "id" | "created_at" | "updated_at"> {}

export interface UpdatePerson extends Partial<CreatePerson> {}
