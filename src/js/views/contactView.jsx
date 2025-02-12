import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { ContactForm } from "../component/contactForm.jsx";

export const ContactView = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    // Estado del formulario
    const [formData, setFormData] = useState({
        fname: "",
        email: "",
        address: "",
        phone: ""
    });
    
    useEffect(() => {
        if (id) {
            const contactToEdit = actions.getContactById(id);
            if (contactToEdit) {
                actions.setSelected(contactToEdit); // Guardar en el estado global
                setFormData({
                    fname: contactToEdit.fname || "",
                    email: contactToEdit.email || "",
                    address: contactToEdit.address || "",
                    phone: contactToEdit.phone || ""
                });
            }
        }
    }, [id, store.contacts]);

    return (
        <div className="container d-flex justify-content-center mt-5">
            <ContactForm
                isEditing={!!id}
            />
        </div>
    );
};
