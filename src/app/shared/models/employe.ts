export interface Iemployee {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    gender: "male" | "female"
    dob: string;
    password: string;
    confirmPassword:string;
}