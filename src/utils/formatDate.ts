import { format, parseISO } from 'date-fns';

const formatDate = (date: Date): string => {
  const parsedDate = format(parseISO(String(date)), 'dd/MM/yyyy');
  return parsedDate;
};

export default formatDate;
