import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + bad + neutral;
  const average = all > 0 ? (good - bad) / all : 0;
  const positive = all > 0 ? (good / all) * 100 : 0;
  const header1 = "give feedback";
  const header2 = "statistics";
  const optionGood = "good";
  const optionNeutral = "neutral";
  const optionBad = "bad";

  const increaseGood = () => {
    console.log("good increased");
    setGood(good + 1);
  };

  const increaseNeutral = () => {
    console.log("neutral increased");
    setNeutral(neutral + 1);
  };

  const increaseBad = () => {
    console.log("bad increased");
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text={header1} />
      <Button text={optionGood} handleClick={increaseGood} />
      <Button text={optionNeutral} handleClick={increaseNeutral} />
      <Button text={optionBad} handleClick={increaseBad} />
      <Header text={header2} />
      <Content
        all={all}
        good={good}
        neutral={neutral}
        bad={bad}
        average={average.toFixed(2)}
        positive={positive.toFixed(2)}
      />
    </div>
  );
};

export default App;

const Header = (props) => {
  return <h1>{props.text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Content = (props) => {
  if (props.all == 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <Statistics
        good={props.good}
        neutral={props.neutral}
        bad={props.bad}
        all={props.all}
        average={props.average}
        positive={props.positive}
      />
    </div>
  );
};

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive + "%"} />
      </tbody>
    </table>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};
