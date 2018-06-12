// @flow

import React, { Component } from 'react';
import './App.css';
import { minToSec, friendlyTime } from './lib';
import Button from './Button';

type Props = {};

type State = {
  break: number,
  session: number,
  time: number,
  touched: boolean,
  paused: boolean,
  isSession: boolean
};

const initialState: State = {
  break: minToSec(5),
  session: minToSec(25),
  time: minToSec(25),
  touched: false,
  paused: false,
  isSession: true
};

class App extends Component<Props, State> {
  state = initialState;
  interval: any;
  decrementTimer = () => {
    this.setState(
      state => ({ time: state.time - 1 }),
      () => {
        if (this.state.time === 0) {
          this.setState(state => ({
            time: state.isSession ? state.break : state.session,
            isSession: !state.isSession
          }));
        }
      }
    );
  };
  incrementBreak = () => {
    this.setState(state => ({ break: state.break + minToSec(1) }));
  };
  decrementBreak = () => {
    this.setState(state => ({ break: state.break - minToSec(1) }));
  };
  incrementSession = () => {
    this.setState(state => ({ session: state.session + minToSec(1) }));
  };
  decrementSession = () => {
    this.setState(state => ({ session: state.session - minToSec(1) }));
  };
  start = () => {
    if (!this.interval) {
      this.setState({ touched: true, paused: false });
      this.interval = setInterval(this.decrementTimer, 1000);
    }
  };
  pause = () => {
    this.setState({ paused: true });
    clearInterval(this.interval);
    this.interval = null;
  };
  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState(state => ({
      ...initialState,
      break: state.break,
      session: state.session,
      time: state.session
    }));
  };
  render() {
    return (
      <div className="App">
        <section>
          <div className="title">Pomodoro Clock</div>
        </section>
        <section>
          <div className={`${this.state.isSession ? '' : 'active'}`}>
            <div>BREAK</div>
            {friendlyTime(this.state.break)}
            <div>
              <Button onClick={this.incrementBreak} text="+" />
              <Button onClick={this.decrementBreak} text="-" />
            </div>
          </div>
          <div className={`${this.state.isSession ? 'active' : ''}`}>
            <div>SESSION</div>
            {friendlyTime(this.state.session)}
            <div>
              <Button onClick={this.incrementSession} text="+" />
              <Button onClick={this.decrementSession} text="-" />
            </div>
          </div>
        </section>
        <section>
          <div>
            {friendlyTime(this.state.time)}
            <div>
              <Button
                onClick={this.start}
                text="START"
                active={this.state.touched && !this.state.paused}
              />
              <Button
                onClick={this.pause}
                text="PAUSE"
                active={this.state.touched && this.state.paused}
              />
              <Button
                onClick={this.stop}
                text="RESET"
                active={!this.state.touched}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
