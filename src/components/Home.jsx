import { useState, useEffect } from "react";
import service from "../service/network";
import Table from "./Table";
import Success from "./SuccessOperation";
import Error from "./FailedOperation";
import View from "../hoc/UseInView";

const row = (contact, index, handleDelete) => {
    return (
        <tr key={contact.id}>
            <th>{index + 1}</th>
            <td className="h-full">
                <View>{contact.name}</View>
            </td>
            <td>
                <View>{contact.number}</View>
            </td>
            <td>
                <View>
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
                </View>
            </td>
        </tr>
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
            console.log(response);
            setContacts(response);
        });
        setTimeout(() => {
            if (feedback) setFeedback(null);
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
                    setFeedback({
                        type: "success",
                        message: `${name}'s number is updated.`,
                    });
                });
            }
        } else if (name === "" || number === "") {
            setFeedback({
                type: "fail",
                message: "name and phone number can't be empty",
            });
        } else {
            service
                .create({ name, number })
                .then((response) => {
                    console.log('successfully added', response);
                    setContacts(contacts.concat(response));
                    setName("");
                    setNumber("");
                    setFeedback({
                        type: "success",
                        message: `${name} is added.`,
                    });
                })
                .catch((error) => {
                    console.log('catching from home', error);
                    setFeedback({ type: "fail", message: error.response.data.error });
                });
        }
    };

    const handleDelete = (id, name) => {
        // console.log(id);
        if (window.confirm(`Delete ${name}?`)) {
            console.log("id: ", id, "is going to be deleted");
            service
                .deleteContact(id)
                .then((response) => {
                    setContacts(contacts.filter((contact) => contact.id != id));
                    setFeedback({
                        type: "success",
                        message: `${name} is deleted.`,
                    });
                })
                .catch((error) => {
                    setFeedback({ type: "fail", message: error });
                });
        }
    };

    return (
        <>
            <div
                className={`fixed ${
                    feedback ? "block" : "hidden"
                } top-20 h-32 w-[100vw] p-5 z-20`}
            >
                {feedback && feedback.type === "success" && (
                    <Success>{feedback.message}</Success>
                )}
                {feedback && feedback.type === "fail" && (
                    <Error>{feedback.message}</Error>
                )}
            </div>
            <section className="relative mt-20">
                <div className="p-5 flex flex-wrap gap-5 justify-between">
                    <form
                        className="card-body w-80 h-fit p-5 shadow-2xl bg-base-200 lg:sticky lg:top-36"
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
                    <div className="flex-grow p-4 max-w-[calc(100vw-30px)] shadow-2xl">
                        <Table>
                            {query === ""
                                ? contacts.map((contact, index) => {
                                      return row(contact, index, handleDelete);
                                  })
                                : contacts.map((contact, index) => {
                                      // console.log(contact.name.match(RegExp(query, 'i')));
                                      if (
                                          contact.name.match(RegExp(query, "i"))
                                      )
                                          return row(
                                              contact,
                                              index,
                                              handleDelete
                                          );
                                  })}
                        </Table>
                    </div>
                </div>
            </section>
        </>
    );
}
