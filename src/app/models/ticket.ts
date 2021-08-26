import { Locker } from "./locker";

export class Ticket {
    id!: number;
    startDateTime!: Date;
    endDateTime!: Date;
    remark!: string;
    lockers!: Locker[];
}