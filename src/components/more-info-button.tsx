interface Props {
  handleToggle: () => void;
}
const MoreInfoBtn: React.FC<Props> = ({ handleToggle }) => {
  return (
    <div className="more-info-button">
      <button onClick={handleToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default MoreInfoBtn;
