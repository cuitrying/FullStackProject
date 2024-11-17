import React from 'react'

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => {
    console.log('Calculating total:', sum, part)
    return sum + part.exercises
  }, 0)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} />
    </div>
  )
}

const Header = ({ course }) => {
  return <h2>{course}</h2>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({ total }) => {
  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  )
}

export default Course