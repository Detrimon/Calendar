type Props = {
  year: number
}

export const CalendarHeader = (props: Props) => {
  return <div>{`< ${props.year} >`}</div>;
};