import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Answer from './Answer';
import './css/questions.css';
import fistLogo from './../../assets/fistLogo.png'
import { useDispatch } from 'react-redux';
import {
   addScore,
   clearScore,
   incrementByAmount 
}  from '../Score/scoreSlice'
import selectCount from "../Score/scoreSlice"
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function Questions({ question }) {
  // const classes = useStyles();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [flip, setFlip] = useState(false)
  const [selectOption, setSelectOption] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const handleClick = (e) => {
    setSelectedAnswer(e.target.value)
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }; 
  const handleChange = (e) => {
    setSelectOption(e.target.value)
    console.log('choice', e.target.value)
  }
  const handleSubmit = () => {
     if (selectedAnswer === question.answer) {
       debugger
       dispatch(addScore())
       debugger
     } 
     // if correct, score ++
     // after submitted, disable
  }
  return (
    <div className='question-main-container'>
      <button  className="card-btn" type="button" onClick={handleOpen}>
        <img className="card-logo-img" src={fistLogo}/>
        <label className="card-label"> #NowThatsCap</label>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        className="modal-container-modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="paper-design" /*className={classes.paper}*/ >
              {console.log(question.question)}
                <h2 className="question-styling" id="transition-modal-title">{question.question}</h2>
                <img className="question-img-styling" src={question.image} width='350px' height="300px"/>
                <div className='multiple-choice'>
                  {question.options.map((item, i) => {
                    return (
                      <div className='options' key={item.id}> 
                        <form onSubmit={handleSubmit}>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio" 
                                    name="inlineRadioOptions"
                                    id="inlineRadio1" 
                                    value={item}
                                    onChange={handleChange}
                                    checked={selectOption === item}
                                    onClick={handleClick}
                                    />
                            <div className="style-option-div"> 
                              <label className="form-check-label option-labels" for="inlineRadio1">{item}</label>
                            </div>
                          </div>
                        </form>
                      </div>
                    )
                  })}
                </div>
                <div className="facts-cap-btn-div" type="button" onClick={()=> setFlip(!flip)}>
                  {flip ? <Answer question={question}/> : <button className="facts-cap-btn" type="button" onClick={handleSubmit}>Facts or Cap?</button>}
                </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}