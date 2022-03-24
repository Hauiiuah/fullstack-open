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
    
    let total=parts.reduce((prev,cur)=> prev + cur.exercises ,0)
  
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

export default Course;