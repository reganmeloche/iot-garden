function NotFound(message) {
    this.message = message || 'Not found!';
    this.stack = (new Error()).stack;
}
NotFound.prototype = Object.create(Error.prototype);
  
function ValidationError(message) {
    this.message = message || 'Invalid input!';
    this.stack = (new Error()).stack;
}
ValidationError.prototype = Object.create(Error.prototype);

function AlreadyExists(message) {
    this.message = message || 'Object already exists!';
    this.stack = (new Error()).stack;
}
AlreadyExists.prototype = Object.create(Error.prototype);

function Unauthorized(message) {
    this.message = message || 'Unauthorized!';
    this.stack = (new Error()).stack;
}
Unauthorized.prototype = Object.create(Error.prototype);
  
module.exports = {
    NotFound, ValidationError
}
  