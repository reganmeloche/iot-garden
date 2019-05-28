
export default class Utilities {

    static validatePassword = (password) => {
        if (password.length < 8) {
            return { error: 'Password must be at least 8 characters. '};
        }

        if (!password.match(/\d/)) {
            return { error: 'Password must contain a number.' };
        }

        if (!password.match(/[A-Z]/)) {
            return { error: 'Password must contain an upper case letter.' };
        }

        if (!password.match(/[a-z]/)) {
            return { error: 'Password must contain a lower case letter.' };
        }

        return true;

    }
}