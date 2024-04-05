import { useState, useEffect } from "react";
import service from "../service/network";

export default function HomePage({ query }) {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    useEffect(() => {
        service.getAll().then((response) => {
            console.log("promise fulfilled");
            setContacts(response);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(query);
        if (contacts.find((contact) => contact.name === name)) {
            if (window.confirm(`${name} already exists. Do you want to update the phone number?`)) {
                const id = contacts.find(contact => contact.name === name).id;
                service.updateContact(id, { name, number }).then((response) => {
                    setContacts(contacts.map(contact => contact.id == id ? response : contact));
                    setName("");
                    setNumber("");
                    console.log(`${name}'s number has updated!`);
                });
            }
        } else {
            service.create({ name, number }).then((response) => {
                console.log(response);
                setContacts(contacts.concat(response));
                setName("");
                setNumber("");
            });
        }
    };

    const handleDelete = (id, name) => {
        // console.log(id);
        if (window.confirm(`Delete ${name}?`)) {
            service.deleteContact(id).then((response) => {
                setContacts(contacts.filter((contact) => contact.id != id));
                console.log(response.name + "deleted from contact");
            });
        }
    };

    return (
        <div className="p-10 flex flex-col">
            <form method="post" onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="name">Name: </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </p>
                <p>
                    <label htmlFor="number">Number: </label>
                    <input
                        id="number"
                        type="number"
                        value={number}
                        onChange={(e) => {
                            setNumber(e.target.value);
                        }}
                    />
                </p>
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </form>
            <div>
                <ul>
                    {query === ""
                        ? contacts.map((contact) => {
                              return (
                                  <li key={contact.id}>
                                      <p>
                                          {contact.name}: {contact.number}
                                          <button
                                              type="button"
                                              className="btn btn-error"
                                              onClick={() => {
                                                  handleDelete(
                                                      contact.id,
                                                      contact.name
                                                  );
                                              }}
                                          >
                                              Delete
                                          </button>
                                      </p>
                                  </li>
                              );
                          })
                        : contacts.map((contact) => {
                              // console.log(contact.name.match(RegExp(query, 'i')));
                              if (contact.name.match(RegExp(query, "i")))
                                  return (
                                      <li key={contact.id}>
                                          <p>
                                              {contact.name}: {contact.number}
                                              <button
                                                  type="button"
                                                  className="btn btn-error"
                                                  onClick={() => {
                                                      handleDelete(
                                                          contact.id,
                                                          contact.name
                                                      );
                                                  }}
                                              >
                                                  Delete
                                              </button>
                                          </p>
                                      </li>
                                  );
                          })}
                </ul>
            </div>
        </div>
    );
}
