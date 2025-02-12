import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ContactCard = ({contact}) => {
    const { actions } = useContext(Context);
    const { id,fname, address, email, phone } = contact;

    return (
        <div className=" container row d-flex justify-content-center border border-secondary rounded mx-5 my-3 p-3">
            <div className="card-body d-flex text-start">
                <figure>
                    <img
                        className="rounded img-fluid col-4 col-sm-6 col-xs-12 ms-2"
                        src={"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"}
                        alt={fname}
                        width={"100px"}
                        height={"100px"}
                    />
                </figure>
                <div className="col-5 col-sm-5 d-flex flex-column">
                    <h5 className="mb-2">{fname}</h5>
                    <p className="my-3 text-secondary">
                        <span className="fa-solid fa-location-dot">
                            </span> 
                    {address}
                    </p>
                    <p className="my-3 text-secondary">
                        <span className="fa-solid fa-phone">
                            </span> 
                    {phone}
                    </p>
                    <p className="my-3 text-secondary">
                        <span className="fa-solid fa-envelope">
                            </span> 
                    {email}
                    </p>
                </div>
                <div className="col-3 col-sm-4 text-end me-4 pe-5 mt-2">
                    <Link 
                        className="fa-solid fa-pen mx-2 text-secondary"
                        onClick={() => actions.setSelected(contact)} 
                        to={`/contactview/${contact.id}`}
                        cursor= {"pointer"}>
                    </Link>
                    <span 
                        className="fa-solid fa-trash mx-2 text-danger" 
                        onClick={() => actions.deleteContact(id)}
                        cursor= {"pointer"}>
                    </span>
                </div>
            </div>
        </div>
    );
};