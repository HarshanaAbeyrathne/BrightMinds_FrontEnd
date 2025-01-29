import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';

function TodoList() {
  const milestones = [
    { age: "6 weeks to 3 Months", items: ["Able to raise the hand while lying on the hands", "Able to keep looking at something moving from one place to another", "Responds to sudden loud noise by stopping or increasing its activity", "As a response to some stimulus (b.o..t..) it has the ability to feel sounds like"] },
    { age: "3 – 6 Months", items: ["Lifts the head and chest up while standing on hands", "Intertwines fingers and plays with hands", "Reaches out to some material and grasps it with the whole palm", "He / She turns his or her head towards the sound", "Makes single letter sounds (ga-da-ta-da)", "Laughs out loud"] },
    { age: "6 – 9 Months", items: ["Raises head when lying on back", "Turns / Flips from top hand to front hand and front hand to top hand", "Transfers things from one hand to another", "A certain voice sounds repeatedly"] },
    { age: "18 Months – 2 years", items: ["Walks unaided", "Raised with help", "A tower is made using 2-3 blocks", "Speaks about 10 words. A sentence with at least 2 words can be spoken"] },
    { age: "2 years – 3 years", items: ["Able to run without falling", "Can go up and down the stairs without falling", "Able to draw a circle/circular figure", "Able to form a sentence with 3 or more words"] },
    { age: "3 years – 4 years", items: ["Stands on one leg", "Able to jump with jump", "Can put shoes and get dressed (except button)", "Counts to three", "Complete and sometimes even complex sentences can be used."] },
    { age: "4 years – 5 years", items: ["Can jump with one leg", "Gets dressed by himself/herself", "Eats alone", "Able to draw simple human figures", "A picture can be described using the verb, past, present and future tenses correctly", "Can state their name and age"] }
  ];

  const [checkedStates, setCheckedStates] = useState(() => {
    const savedProgress = JSON.parse(localStorage.getItem('todoProgress')) || [];
    return savedProgress.length ? savedProgress : milestones.map(group => new Array(group.items.length).fill(false));
  });

  useEffect(() => {
    localStorage.setItem('todoProgress', JSON.stringify(checkedStates));
  }, [checkedStates]);

  const handleOnChange = (groupIndex, index) => {
    const updatedCheckedStates = checkedStates.map((group, idx) => (
      idx === groupIndex ? group.map((item, itemIdx) => itemIdx === index ? !item : item) : group
    ));
    setCheckedStates(updatedCheckedStates);
  };

  return (
    <div className='font-poppins'>
      <div className='min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-pink-300'>
        <Navbar />
        <h1 className='text-center p-4 text-larg'>Todo List</h1>
        <div className='p-4 grid grid-cols-2 gap-4'>
          {milestones.map((milestone, groupIndex) => (
            <div key={groupIndex} className="mb-4 bg-white p-4 rounded shadow">
              <div className='font-bold text-lg mb-2'>{milestone.age}</div>
              {milestone.items.map((item, idx) => (
                <div key={idx} className='flex items-center mb-2'>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${groupIndex}-${idx}`}
                    name={item}
                    value={item}
                    checked={checkedStates[groupIndex][idx]}
                    onChange={() => handleOnChange(groupIndex, idx)}
                    className='mr-2'
                  />
                  <label htmlFor={`custom-checkbox-${groupIndex}-${idx}`}>{item}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
