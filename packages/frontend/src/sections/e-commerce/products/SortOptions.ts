// types
import { SortOptionsProps } from 'types/e-commerce';

// ==============================|| PRODUCT GRID - SORT FILTER ||============================== //

const SortOptions: SortOptionsProps[] = [
  {
    value: 'low',
    label: 'Open Date'
  },
  {
    value: 'low',
    label: 'Close Date'
  },
  {
    value: 'popularity',
    label: 'Agency'
  },
  {
    value: 'discount',
    label: 'Branch'
  },
  {
    value: 'new',
    label: 'Phase'
  }
];

export default SortOptions;
