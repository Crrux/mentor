export const LEVELS = [
  {
    id: 1,
    name: 'primaire',
  },
  {
    id: 2,
    name: 'college',
  },
  {
    id: 3,
    name: 'lycée',
  },
];

export const SUBJECTS = [
  { id: 1, name: 'francais', levelId: 1 },
  { id: 2, name: 'anglais', levelId: 1 },
  { id: 3, name: 'math', levelId: 3 },
  { id: 4, name: 'physique', levelId: 2 },
];

export default {
  subjects: SUBJECTS,
  levels: LEVELS,
};
