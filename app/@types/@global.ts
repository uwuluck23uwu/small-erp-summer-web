export interface IDropDown {
    id: number;
    title: string;
  }
  
  export interface IMenuList {
    code: string;
    title: string;
    icon: string;
    backgroundColor: string;
    linkPage: string;
  }
  
  export interface IMenuListRight {
    code: string;
    title: string;
    icon: string;
    color: string;
  }

  export interface IPagin {
    currentPage: number;
    pageSize: number;
    totalRows: number;
    totalPages: number;
  }

  export interface ISvg {
    className?: string;
  }