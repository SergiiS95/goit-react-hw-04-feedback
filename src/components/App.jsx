import React, {useState} from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = state => {
  switch (state) {
    case 'good':
      setGood(prevGood => prevGood +1)
      break;
    case 'neutral':
      setNeutral(prevNeutral=> prevNeutral +1)
      break;
    case 'bad':
      setBad(prevBad => prevBad +1)
      break;

    default:
      return;
  }
}


  const countTotalFeedback = () => {
    let total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    if (countTotalFeedback() === 0) {
      return 0;
    }
    return Math.round((good / countTotalFeedback()) * 100);
  };

 
    
    const total = countTotalFeedback();
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys({ good, neutral, bad })}
            onLeaveFeedback={onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              PositiveFeedback={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  
}
