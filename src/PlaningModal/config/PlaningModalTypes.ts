interface IPlaningModal{
  year: number;
  month: number;
  selected_date: Date;
};

export type PlaningModalProps = Partial<IPlaningModal>;