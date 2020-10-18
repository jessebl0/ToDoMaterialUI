import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      height: "10ch"
    },
  },
}));

const useStyles1 = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function App() {
  //Need state for list of tasks
  const [tasks, setTasks] = useState([]);
  const [nameInput, setInputN] = useState("");
  const [descriptInput, setInputD] = useState("");
  const [dueInput, setInput] = useState("");

  const classes = useStyles();
  const classesCard = useStyles1();

  //Need a function to add a task to the task list
  const handleAdd = () => {
    setTasks([
      ...tasks, {nameInput, descriptInput, dueInput}
    ])
  };


  const TodoItem = ({title, dueDate, description}) => {

    //Need a function to toggle whether the task is checked off or not
    const [checkOff, setCheckOff] = useState(null)
    const handleCheckOff = () => {
      setCheckOff(!checkOff)
    };

    //Need a function to delete the task from the todo list
    //Note that because we've placed this component inside of our main app,
    //it has direct access to the state of our main app
    const handleDelete = () => {
      setTasks(tasks.filter((item) => {
        if((item.nameInput === title) && (item.descriptInput === description) && (item.dueInput === dueDate)){
          return false;
        }
        else {
          return true
        }
      }))
    };

    // return (
    //   <div style = {{textAlign: "center", borderStyle: "solid", paddingBottom: "10px", backgroundColor: "pink"}} >

    //     {(!checkOff) && <h1>{title}</h1>}
    //     {(!checkOff) && <h4>{description}</h4>}
    //     {(!checkOff) && <h4>{dueDate}</h4>}
    //     {(checkOff) && <h1 style = {{textDecoration: "line-through"}}>{title}</h1>}
    //     <button onClick={handleCheckOff}>Check off</button>
    //     <button onClick={handleDelete}>Delete</button>
    //   </div>
    // );

    return (
      <Card className={classesCard.root} variant = "outlined">
        {(!checkOff) && 
          <CardContent>
            <Typography variant = "h4" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant = "body1" color="textSecondary" gutterBottom>
              {description}
            </Typography>
            <Typography variant = "body2" color="textSecondary" gutterBottom>
              {dueDate}
            </Typography>
          </CardContent>
        }
        {(checkOff) &&
          <CardContent>
            <Typography variant = "h4" color="textSecondary" gutterBottom>
              Done: {title}
            </Typography>
          </CardContent>
        }
        <CardActions>
          <Button variant = "outlined" color = "primary" onClick={handleCheckOff} size="small">Done!</Button>
          <Button variant = "outlined" color = "primary" onClick={handleDelete} size="small">Delete</Button>
          {/* <IconButton onClick={handleDelete}>
            <DeleteIcon fontSize = "small" />
          </IconButton> */}
        </CardActions>
      </Card>
    )
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Title
      {<input value = {nameInput} type = "text" onChange = {(e) => setInputN(e.target.value)}/>} Description
      {<input value = {descriptInput} type = "text" onChange = {(e) => setInputD(e.target.value)}/>} Due Date
      {<input value = {dueInput} type = "text" onChange = {(e) => setInput(e.target.value)}/>}
      <button onClick={handleAdd}>Add Todo Item</button> */}
      
      {/* material ui stuff */}

      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <InputLabel htmlFor="titleInput">Title</InputLabel>
          <Input id="titleInput" value={nameInput} onChange = {(e) => setInputN(e.target.value)} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="descriptInput">Description</InputLabel>
          <Input id="descriptInput" value={descriptInput} onChange = {(e) => setInputD(e.target.value)} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="dueInput">Due Date</InputLabel>
          <Input id="dueInput" value={dueInput} onChange = {(e) => setInput(e.target.value)} />
        </FormControl>
      </form>
      <Button variant = "outlined" color = "secondary" onClick={handleAdd}>
        Add List Item
      </Button>
      
      
      {/* All of the tasks should render here. How can we transform the 
      list of tasks into a list of components? */}
      {tasks.map((item) => <TodoItem title = {item.nameInput} description = {item.descriptInput}
      dueDate = {item.dueInput}/>)}


    </div>
  );
}