import { Injectable } from '@angular/core';
import * as EmailValidator from 'email-validator';

declare var M:any

@Injectable({
  providedIn: 'root'
})
export class ValidationServiceService {

  constructor() { }

  //validation for Email
  validateEmail(uEmail: any) {
    let errMsg = ''
    if (!EmailValidator.validate(uEmail)) {
      errMsg = 'Invalid Email||'
    }
    return errMsg;
  }
  validateYear(year: any) {
    let msg = ''
    if (Number(year)) {
      if ((Number(year) < 0 || Number(year) > 2020)) {
        msg = 'Year should be less than 2020||'
      }

    }
    else {
      msg = 'year should be number||'
    }
    return msg;
  }
  validateDuration(duration: any) {
    let msg = ''
    if (parseFloat(duration)) {
      if ((parseFloat(duration) < 1 || (parseFloat(duration) > 7))) {
        msg = 'Duration should be less than 7min||'
      }
    }
    else {
      msg = 'duration should be mm.ss format||'
    }
    return msg;
  }

  validateTitle(title:String){
    let msg = ''
    if(Boolean(title)){
      if (String(title).length < 1 || String(title).length > 15) {
        msg = msg.concat("title should be less than 15||")
      }
    }
    else{
      msg='title shouldnt be empty||'
    }
    return msg
  }
  validateDesc(desc:String)
  {
    let msg = ''
    if(Boolean(desc)){
      if (String(desc).length < 1 || String(desc).length > 120) {
        msg = msg.concat("Description should be less than 120||")
      }
    }
    else{
      msg='Description shouldnt be empty||'
    }
    return msg
  }
  generateToast(errMsg:String){
    errMsg.split('||').forEach(
      d => {
        if (Boolean(d)) {
          M.toast({ html: d, classes: 'rounded' })
        }

      }
    );
  }

  validatereview(review: any) {
    let msg = ''
    if (Boolean(review)) {
      if(String(review).length > 120){
        msg = 'review should be 120 characters||'
      }
    }
    else {
      msg = 'review shouldnt be empty||'
    }
    return msg;
  }
  validaterating(rate) {
    let msg = ''
    //console.log(typeof rate)
    if (Number(rate)) {
      //should be between 0 and 5
      if (Number(rate) > 5 || Number(rate) <= 0) {
        msg = 'Rating should be between 1 and 5||'
      }
    }
    else {
      msg = 'rating should be number||'
    }
    return msg;
  }

  validatePassword(uPass: any) {
    let errMsg = ''
    if (Boolean(uPass)) {

      if (uPass.length > 7 && uPass.length < 11) {

        // var regex = new Regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
        var letter = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if (!uPass.match(letter)) {
          errMsg = errMsg.concat('Password must have one upper&lower case English letter,one digit and special character and minimum 8 in length||')
        }
      }
      else {
        errMsg = errMsg.concat('Password should be between 8 and 10||')
      }
    }
    else {
      errMsg = errMsg.concat('Password cannot be empty||')
    }
    return errMsg
  }

  validateUserName(uName) {
    let errMsg = ''
    if (Boolean(uName)) {
      //Expression can start or end only with a letter
      //Expression cannot contain consecutive spaces
      var letter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/
      if (!uName.match(letter)) {
        errMsg = errMsg.concat('Username can start or end only with a letter and cannot contain consecutive spaces||')
      }
    }
    else {
      errMsg = errMsg.concat('Username cannot be empty||')
    }
    return errMsg
  }
}
