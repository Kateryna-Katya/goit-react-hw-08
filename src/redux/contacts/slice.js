import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "../contacts/operations";




const handlePending = (state) => {
    state.loading = true;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null,
                    state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null,
                    state.contacts.push(action.payload);
            })
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null,
                    state.contacts = state.contacts.filter(contact => contact.id !== action.payload)
            })
            .addCase(deleteContact.rejected, handleRejected)
    }

})


export default contactsSlice.reducer;