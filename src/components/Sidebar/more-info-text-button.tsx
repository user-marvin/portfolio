interface Props {
  handleToggle: () => void;
}
const MoreInfoTextBtn: React.FC<Props> = ({ handleToggle }) => {
  return (
    <div className="more-info-button more-info-text">
      <button onClick={handleToggle}>Show Contacts</button>
    </div>
  );
};

export default MoreInfoTextBtn;
