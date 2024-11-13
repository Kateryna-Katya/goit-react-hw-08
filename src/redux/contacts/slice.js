import { createSlice } from "@reduxjs/toolkit";
import {
    addContact,
    deleteContact,
    fetchContacts,
    updateContact,
} from "./operations";




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
                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );
                state.items.splice(index, 1);
            })
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload)
            })
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(updateContact.pending, handlePending)
            .addCase(updateContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.currentUpdatingContact = null;
                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );
                state.items.splice(index, 1, action.payload);
            })
            .addCase(updateContact.rejected, handleRejected);
    },
});

export default contactsSlice.reducer;
export const { resetContacts, setUpdatingContact, discardUpdating } =
    contactsSlice.actions;