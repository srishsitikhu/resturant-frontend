const AddRating = ({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (val: number) => void;
}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex space-x-1">
      {stars.map((star) => (
        <svg
          key={star}
          onClick={() => onChange(star)}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 cursor-pointer ${
            rating >= star
              ? "fill-yellow-400 stroke-yellow-500"
              : "fill-gray-200 stroke-gray-400"
          }`}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.538 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.783.57-1.838-.196-1.538-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z"
          />
        </svg>
      ))}
    </div>
  );
};

export default AddRating