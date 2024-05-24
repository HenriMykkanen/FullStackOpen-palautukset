const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <SumOfExercises parts={course.parts} />
    </div>
  );
};
export default Course;

const Header = ({ header }) => {
  return <h2>{header}</h2>;
};

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const SumOfExercises = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p><strong>Total of {sum} exercises</strong></p>;
};
