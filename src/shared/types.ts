export type TQueryParams = {
  root_path: string,
  filters: {
    [key: string]: {
      value: string | boolean;
      rel: string;
    }
  },
  fields: string[]
};