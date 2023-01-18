//Handels the http exceptions and sends the error message to the client 
class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message); // Call the parent class constructor
    this.status = status;
    this.message = message;
  }
}

export default HttpException;