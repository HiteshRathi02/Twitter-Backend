
class SuccessResponse {
    constructor(message){
        this.success = true;
        this.message = "Successfully completed";
        this.data = message;
        this.error = {};
    }
}
export default SuccessResponse;