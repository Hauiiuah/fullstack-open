const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Part = ({name,exercises}) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = ({parts}) => {
  return (
    <>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({parts}) => {
  let total = 0;
  parts.forEach((e) => (total = total + e.exercises));

  return (
    <>
      <p><b>Number of exercises {total}</b></p>
    </>
  );
};


const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application developtment",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id:1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id:2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id:3
      },
      {
        name: "Eventlistener",
        exercises: 3,
        id: 4
      },
      {
        name: "Redux",
        exercises: 11,
        id:5
      }
    ],
  };

  return <Course course={course} />
};

export default App;
