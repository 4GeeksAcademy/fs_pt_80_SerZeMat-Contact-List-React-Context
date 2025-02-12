import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { ContactCard } from "../component/contactCard.jsx";


export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getContact(); // Cargar contactos al montar el componente
    }, []);

    return (
        <div className="container mt-4">
            <div className="list-group">
                {store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))
                ) : (
                    <p className="text-center text-secondary">No contacts available.</p>
                )}
            </div>
        </div>
    );
};