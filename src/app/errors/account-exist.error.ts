export class AccountExistError extends Error {
    constructor() {
        super('Account already exists');
    }
}