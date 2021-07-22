import { Pagination } from "./pagination";
import { User } from "./user";

export class UserList {
    data: User[];
    pagination: Pagination;

    constructor(data: User[], pagination: Pagination) {
        this.data = data;
        this.pagination = pagination;
    }
}
