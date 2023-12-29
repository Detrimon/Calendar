
export type TGetHolidayResponse = {
  data: {
    id: number,
    attributes: {
      year: number,
      date: string,
      type: "HOLIDAY" | "WORKDAY",
      createdAt: string,
      updatedAt: string
    }
  }[]
};