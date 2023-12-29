export type TQueryParams = {
  root_path: string,
  filters: {
    [key: string]: {
      value: string | number | boolean;
      rel: string;
    }
  },
  fields: string[]
};