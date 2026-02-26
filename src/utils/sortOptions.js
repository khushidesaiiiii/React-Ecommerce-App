export const SORT_OPTIONS = [
  { label: "Default", sortBy: null, order: 'asc' },
  { label: "Name (A → Z)", sortBy: "title", order: "asc" },
  { label: "Name (Z → A)", sortBy: "title", order: "desc" },
  { label: "Price (Low → High)", sortBy: "price", order: "asc" },
  { label: "Price (High → Low)", sortBy: "price", order: "desc" },
  { label: "Rating (High → Low)", sortBy: "rating", order: "desc" },
];

export const USER_SORT_OPTIONS = [
  { label: "Default", sortBy: null, order: 'asc' },
  { label: "Name (A → Z)", sortBy: "firstName", order: "asc" },
  { label: "Name (Z → A)", sortBy: "firstName", order: "desc" },
  { label: "Age (Low → High)", sortBy: "age", order: "asc" },
  { label: "Age (High → Low)", sortBy: "age", order: "desc" },
];

