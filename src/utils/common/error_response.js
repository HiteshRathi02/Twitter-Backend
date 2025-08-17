
class ErrorResponse {
    constructor(message){
        this.success = false;
        this.message = "Something went wrong";
        this.data = {};
        this.error = message;
    }
}
export default ErrorResponse;