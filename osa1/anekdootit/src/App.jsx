import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const initialVotes = Array(anecdotes.length).fill(0);

  const [votes, setVotes] = useState(initialVotes);
  const [selected, setSelected] = useState(0);

  const anecdoteRandomizer = () => {
    let randomNumber;
    randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
    return selected;
  };

  const upvoteCurrentAnecdote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  return (
    <div>
      <AnecdoteOfTheDay
        anecdote={anecdotes[selected]}
        voteCount={votes[selected]}
        handleVote={upvoteCurrentAnecdote}
        handleNext={anecdoteRandomizer}
      />
      <MostVotedAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const VoteCount = (props) => {
  return <p>Has {props.count} votes</p>;
};

const AnecdoteOfTheDay = ({ anecdote, voteCount, handleVote, handleNext }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <VoteCount count={voteCount} />
      <Button text="Upvote anecdote" handleClick={handleVote} />
      <Button text="Next anecdote" handleClick={handleNext} />
    </div>
  );
};

const MostVotedAnecdote = ({ votes, anecdotes }) => {
  const maxIndex = votes.indexOf(Math.max(...votes));
  let mostVotes = votes[maxIndex];
  let mostVotedAnecdote = anecdotes[maxIndex];

  if (maxIndex == 0) {
    return <div></div>
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{mostVotedAnecdote}</p>
      <VoteCount count={mostVotes} />
    </div>
  );
};
