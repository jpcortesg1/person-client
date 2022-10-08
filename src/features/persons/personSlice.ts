import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../interfaces/person/Person";

const initialState: Array<Person> = [];

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    fillPersons: (state, action: PayloadAction<Array<Person>>) => {
      // add only unique persons
      action.payload.forEach((person) => {
        if (!state.find((p) => p.id === person.id)) {
          state.push(person);
        }
      });
    },
    addPerson: (state, action: PayloadAction<Person>) => {
      state.push(action.payload);
    },
    removePerson: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((person) => person.id === action.payload);
      state.splice(index, 1);
    },
    updatePerson: (state, action: PayloadAction<Person>) => {
      state.map((person, index) => {
        if (person.id === action.payload.id) {
          state[index] = action.payload;
        }
        return person;
      });
    },
  },
});

export const { addPerson, removePerson, updatePerson, fillPersons } =
  personSlice.actions;

export default personSlice.reducer;
