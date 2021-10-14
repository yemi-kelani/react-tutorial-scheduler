import React, { useState, useEffect } from 'react';
import { addScheduleTimes } from './utilities/times.js';
import CourseList from './components/CourseList';
import './App.css';

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () => {
  const [schedule, setSchedule] = useState();
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(addScheduleTimes(json));
    }
    fetchSchedule();
  }, [])

  return (
    <div className="container">
      <Banner title={ schedule === undefined ? 'title missing' : schedule.title } />
      <CourseList courses={schedule === undefined ? [] : schedule.courses } />
    </div>
  );
};

export default App;