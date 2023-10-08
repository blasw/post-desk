const DEBUG = "DEBUG";
const PROD = "PROD";


//Class that is used to log messages with different levels of environment. So you can change it to PROD and all debug messages will be hidden
class Logger {

  /**
   * Creates a new logger instance
   * @param {string} level - Could be "DEBUG" or "PROD" 
   */
  constructor(level) {
    this.level = level;
  }

  /**
   * Logs a debug message
   * @param {string} root - The root of the message
   * @param {string} message - The message to log
   * @param {...any} args - The arguments to log
   */
  debugMsg(root, message, ...args) {
    if (this.level === 'PROD') {
      return;
    }

    let msg = "[DEBUG]: " + `<${root}> ${message}\n`;
    console.log(msg);
    for(let i in args) {
      console.log("  >", args[i]);
    }
  }

  /**
   * Logs an Info Message (for both PROD and DEBUG)
   * @param {string} root 
   * @param {string} message 
   * @param  {...any} args 
   */
  infoMsg(root, message, ...args){
    let msg = "[INFO]: " + `<${root}> ${message}\n`;
    for (let i = 0; i < args.length; i++) {
      msg += ` >${args[i]}\n`;
    }

    console.log(msg);
  }  

  /** 
   * Logs an Error Message (for both PROD and DEBUG). But for PROD error is hidden
   * @param {string} root
   * @param {string} message
   * @param  {...any} args
  */
  errorMsg(root, message, ...args) {
    let msg = "[ERROR]: " + `<${root}> ${message}\n`;
    if (this.level === "PROD"){
      console.log(msg);
      return;
    }

    for (let i = 0; i < args.length; i++) {
      msg += ` >${args[i]}\n`;
    }

    console.log(msg);
  }
}

module.exports = Logger;