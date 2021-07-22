export class Pagination {
    page: number;
    pageSize: number;
    rowCount: number;
    pageCount: number;

    constructor(page: number, pageSize: number, rowCount: number, pageCount: number){
        this.page = page;
        this.pageSize = pageSize;
        this.rowCount = rowCount;
        this.pageCount = pageCount;
    }

}