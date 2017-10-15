import { observable } from 'aurelia-framework';
export class App {
  public textfieldHasFocus:boolean;
  public number1: number;
  public number2: number;
  @observable public userResponse: number;
  public isCorrectAnswer: boolean;
  public timeHasRunOut: boolean;
  public numberOfCorrect: number;
  public numberOfIncorrect: number;
  private timer;
  public timerCountdown: number;
  private countdownInterval;

  constructor(){
    this.numberOfCorrect = 0;
    this.numberOfIncorrect = 0;
    this.number1 = Math.floor( Math.random()*10);
    this.number2 = Math.floor( Math.random()*10);
    this.isCorrectAnswer = false;
    this.timeHasRunOut = false;
    this.setTimer();
    this.textfieldHasFocus=true;
  }

  userResponseChanged(newValue: number, oldValue: number){
    let correctAnswer = this.number1 * this.number2;
    if (newValue == correctAnswer){
      this.isCorrectAnswer = true;
    } else {
      this.isCorrectAnswer = false;
    }
  }
  public answerQuery(){
    clearTimeout(this.timer);
    let correctAnswer = this.number1 * this.number2;
    if (this.userResponse == correctAnswer){
      this.numberOfCorrect++;
    } else {
      this.numberOfIncorrect++;
    }

    this.refreshNumbers();
  }

  public refreshNumbers(){
    this.textfieldHasFocus=true;
    this.userResponse =null;
    this.number1 = Math.floor( Math.random()*10);
    this.number2 = Math.floor( Math.random()*10);
    this.isCorrectAnswer = false;
    this.setTimer();
    
    this.timeHasRunOut = false;
  }
  private setTimer(){
    this.timerCountdown=5;
    clearInterval(this.countdownInterval);
    this.countdownInterval=setInterval(()=> {
      if(this.timerCountdown>0){
        this.timerCountdown--;
      }
    }, 1000);
    this.timer = setTimeout(() => {
      this.timeHasRunOut = true;
      this.answerQuery();
    }, 5000); 
  }
}
