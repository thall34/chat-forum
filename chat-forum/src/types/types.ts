export interface UserLight {
    id: string,
    email: string,
};

export interface UserFull {
    id: string,
    email: string,
    passwordHash: string,
};