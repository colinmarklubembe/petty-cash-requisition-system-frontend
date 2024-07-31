export interface Report {
  id: string;
  title: string;
  content: any;
  createdAt: string;
}

export interface ReportFormInputs {
  title: string;
  content: any;
}
