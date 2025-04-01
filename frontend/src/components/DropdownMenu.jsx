import firstImage from '../images/waldo2_1.jpg';
import secondImage from '../images/waldo2_2.jpg';
import thirdImage from '../images/waldo2_3.jpg';

const DropdownMenu = ({ x, y, isVisible }) => {
  function handleSelectItem() {}

  return (
    <menu
      className={`dropdown-menu ${isVisible ? 'visible' : 'hidden'}`}
      style={{ top: y - 50, left: x + 40 }}
    >
      {/* Contains three images(the targets) */}
      <li>
        <img src={firstImage} alt="Target 1" />
      </li>
      <li>
        <img src={secondImage} alt="Target 1" />
      </li>
      <li>
        <img src={thirdImage} alt="Target 1" />
      </li>
    </menu>
  );
};

export default DropdownMenu;
