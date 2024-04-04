import { useState, useEffect } from "react";
import axios from 'axios';

export default function HomePage({ query }) {

    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then(response => {
            console.log('promise fulfilled');
            setContacts(response.data);
        });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(query);
        if (contacts.find((contact) => contact.name === name)) {
            alert(`${name} is already added to phonebook`);
        } else {
            setContacts(contacts.concat({ name, number }));
            setName("");
            setNumber("");
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
                {query === ""
                    ? contacts.map((contact) => {
                          return (
                              <p key={contact.id}>
                                  {contact.name}: {contact.number}
                              </p>
                          );
                      })
                    : contacts.map((contact) => {
                        // console.log(contact.name.match(RegExp(query, 'i')));
                          if (contact.name.match(RegExp(query, 'i')))
                              return (
                                  <p key={contact.id}>
                                      {contact.name}: {contact.number} 
                                  </p>
                              );
                        
                      })}
            </div>
        </div>
    );
}
