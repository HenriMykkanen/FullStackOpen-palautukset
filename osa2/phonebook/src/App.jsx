import { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personform";
import Persons from "./components/persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      console.log(initialPersons);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personsFilter, setPersonsFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState('')

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setPersonsFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };
    personExistsAlready(newName)
      ? alert(`${newName} is already added to phonebook`)
      : personService
          .create(personObject)
          .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setNewName("");
            setNewNumber("");
            setErrorMessage(
              `Person ${newName} was successfully added to the phonebook`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch((error) => {
            alert(`There was an error adding ${newName} to the phonebook: ${error.message}`);
          });
  };

  const personExistsAlready = (name) => {
    return persons.some((person) => person.name === name);
  };

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`There was an error deleting ${person.name}: ${error.message}`);
        });
        
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={personsFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new person and number</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={personsFilter}
        removePerson={removePerson}
      />
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default App;
