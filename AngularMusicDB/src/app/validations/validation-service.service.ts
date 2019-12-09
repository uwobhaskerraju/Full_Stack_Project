import { Injectable } from '@angular/core';
import * as EmailValidator from 'email-validator';

@Injectable({
  providedIn: 'root'
})
export class ValidationServiceService {

  constructor() { }

  //validation for Email
  validateEmail(uEmail: any) {
    let errMsg = ''
    if (!EmailValidator.validate(uEmail)) {
      errMsg = 'Invalid Email'
    }
    return errMsg;
  }
  validateYear(year: any) {
    let msg = ''
    if (Number(year)) {
      if (!(Number(year) > 0 && Number(year) < 2020)) {
        msg = 's'
      }

    }
    else {
      msg = 'year should be number'
    }
    return msg;
  }
  validateDuration(duration: any) {
    let msg = ''
    if (Number(duration)) {
      if (!(Number(duration) > 0 && (Number(duration) < 7))) {
        msg = 's'
      }

    }
    else {
      msg = 'duration should be number'
    }
    return msg;
  }

  validatereview(review: any) {
    let msg = ''
    if (Boolean(review) && String(review).length < 121) {

    }
    else {
      msg = 'review should have value'
    }
    return msg;
  }
  validaterating(rate) {
    let msg = ''
    if (Number(rate)) {
      if (!(Number(rate) > 0)) {
        msg = 's'
      }

    }
    else {
      msg = 'rating should be number'
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
