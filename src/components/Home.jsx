import { useState, useEffect } from "react";
import service from "../service/network";
import Table from "./Table";
import Success from "./SuccessOperation";
import Error from "./FailedOperation";
import View from "../hoc/UseInView";

const row = (contact, index, handleDelete) => {
    return (
        <View>
            <tr key={contact.id}>
            <th>{index + 1}</th>
            <td>{contact.name}</td>
            <td>{contact.number}</td>
            <td>
                <button
                    className="btn btn-circle btn-outline btn-error scale-50"
                    type="button"
                    onClick={() => {
                        handleDelete(contact.id, contact.name);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </td>
        </tr>
        </View>
    );
};

export default function HomePage({ query }) {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        service.getAll().then((response) => {
            console.log("promise fulfilled");
            setContacts(response);
        });
        setTimeout(() => {
            if (feedback)
                setFeedback(null);
        }, 3000);
    }, [feedback]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(query);
        if (contacts.find((contact) => contact.name === name)) {
            if (
                window.confirm(
                    `${name} already exists. Do you want to update the phone number?`
                )
            ) {
                const id = contacts.find((contact) => contact.name === name).id;
                service.updateContact(id, { name, number }).then((response) => {
                    setContacts(
                        contacts.map((contact) =>
                            contact.id == id ? response : contact
                        )
                    );
                    setName("");
                    setNumber("");
                    setFeedback({type: 'success', message: `${name}'s number is updated.`});
                });
            }
        } else {
            service.create({ name, number }).then((response) => {
                
                setContacts(contacts.concat(response));
                setName("");
                setNumber("");
                setFeedback({type: 'success', message: `${name} is added.`});
            });
        }
    };

    const handleDelete = (id, name) => {
        // console.log(id);
        if (window.confirm(`Delete ${name}?`)) {
            service.deleteContact(id).then((response) => {
                setContacts(contacts.filter((contact) => contact.id != id));
                console.log(response.name + "deleted from contact");
            }).catch(error => {
                setFeedback({type: 'fail', message: error});
            });
        }
    };

    return (
        <>
            <div className="h-32 max-w-screen-xl flex items-center p-5">
                {feedback && feedback.type === 'success' && <Success>{feedback.message}</Success>}
                {feedback && feedback.type === 'fail' && <Error>{feedback.message}</Error>}
            </div>
            <div className="p-10 flex flex-wrap">
                <form
                    className="card-body max-w-96 p-0"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <div className="form-control">
                        <label className="label font-black">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            placeholder="full name"
                            className="input"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label font-black">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            id="number"
                            type="text"
                            value={number}
                            inputMode="numeric"
                            placeholder="+1 789 786 7654"
                            className="input"
                            onChange={(e) => {
                                setNumber(e.target.value);
                            }}
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-info">
                            Add
                        </button>
                    </div>
                </form>
                <div className="flex-grow p-4 max-w-[calc(100%-80px)]">
                    <Table>
                        {query === ""
                            ? contacts.map((contact, index) => {
                                  return row(contact, index, handleDelete);
                              })
                            : contacts.map((contact, index) => {
                                  // console.log(contact.name.match(RegExp(query, 'i')));
                                  if (contact.name.match(RegExp(query, "i")))
                                      return row(contact, index, handleDelete);
                              })}
                    </Table>
                </div>
            </div>
        </>
    );
}
