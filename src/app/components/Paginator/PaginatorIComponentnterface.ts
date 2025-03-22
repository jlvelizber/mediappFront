import { Meta } from "@/app/intefaces";

export interface PaginatorIComponentnterface {
    meta: Meta,
    onPageChange: (page: number) => void
}