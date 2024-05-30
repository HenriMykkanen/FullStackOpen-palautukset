import Person from "./person";

const Persons = ({ persons, filter }) => {
    const personsToShow = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <div>
        {personsToShow.map((person) => (
          <Person key={person.id} name={person.name} number={person.number} />
        ))}
      </div>
    );
  };

export default Persons;