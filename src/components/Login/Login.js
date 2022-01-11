import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import AuthContext from "../store/auth-context";
import InsideLogin from "../UI/input/InsideLogin";

const initialState = {
  value: "",
  isValid: null,
};

const reducerFunc = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

const initialState2 = {
  value: "",
  isValid: null,
};

const reducerFunc2 = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [emailState, dispatchFunc] = useReducer(reducerFunc, initialState);
  const [passwordState, pass_dispatch] = useReducer(
    reducerFunc2,
    initialState2
  );

  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(() => {
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);

  // for form validity

  const { isValid: emailValid } = emailState;
  const { isValid: passwordValid } = passwordState;

  //context
  const authCtx = useContext(AuthContext);

  const  emailInputRef =useRef();
  const  passwordInputRef =useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailValid && passwordValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailValid, passwordValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchFunc({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    pass_dispatch({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   emailState.value.includes('@') && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchFunc({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    pass_dispatch({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if(formIsValid)
    {
      authCtx.onLogin(emailState.value, passwordState.value);
    }
    else if(!emailValid)
    {
      emailInputRef.current.focus();
    }
    else
    {
      passwordInputRef.current.focus();
    }
    };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <InsideLogin
          ref={emailInputRef}
          type="email"
          id="email"
          label="E-mail"
          value={emailState.value}
          isValid={emailValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></InsideLogin>

        <InsideLogin
          ref={passwordInputRef}
          type="password"
          id="password"
          label="password"
          value={passwordState.value}
          isValid={passwordValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></InsideLogin>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
