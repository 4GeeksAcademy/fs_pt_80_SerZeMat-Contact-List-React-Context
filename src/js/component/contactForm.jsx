import React, { useState, useContext} from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const ContactForm = ({ isEditing }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fname: store.selected.fname || '',
        email: store.selected.email || '',
        address: store.selected.address || '',
        phone: store.selected.phone || ''
     });

     const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        actions.setSelected(null);
        navigate("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (store.selected) {
            await actions.updateContact(store.selected.id, formData);
        } else {
            await actions.createContact(formData);
        }
        actions.setSelected(null);
        navigate("/");
    }

    return (
        <form className="col-12 col-sm-8 p-4 rounded bg-white shadow-sm" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">{isEditing ? "Edit Contact" : "Add New Contact"}</h2>

            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange} required
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange} required
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange} required
                    type="text"
                    className="form-control"
                    placeholder="Enter phone"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange} required
                    type="text"
                    className="form-control"
                    placeholder="Enter address"
                />
            </div>

            {/* Botón de acción dinámico */}
            <input
                type="submit"
                className="btn btn-primary col-12"
                value={isEditing ? "Edit Contact" : "Save New Contact"}
            />

            {/* Botón de cancelar */}
            <button
                type="button"
                className="btn btn-secondary col-12 mt-2"
                onClick={handleCancel}
            >
                Cancel
            </button>
        </form>
    );
};