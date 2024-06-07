const Person = ({ name, number, id, removePerson }) => {
  return (
    <p>
      {name} {number} <button onClick={() => removePerson(id)}>Delete</button>
    </p>
  );
};

export default Person;
