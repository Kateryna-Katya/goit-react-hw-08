import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    currentUpdatingContact: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetContacts: (state) => {
      state.items = [];
      state.currentUpdatingContact = null;
    },
    setUpdatingContact: (state, action) => {
      state.currentUpdatingContact = action.payload;
    },
    discardUpdating: (state) => {
      state.currentUpdatingContact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export default contactsSlice.reducer;
export const { resetContacts, setUpdatingContact, discardUpdating } =
  contactsSlice.actions;
