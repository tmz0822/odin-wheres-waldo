import axios from 'axios';
import firstImage from '../images/waldo2_1.jpg';
import secondImage from '../images/waldo2_2.jpg';
import thirdImage from '../images/waldo2_3.jpg';

const DropdownMenu = ({
  x,
  y,
  isVisible,
  image,
  handleAddMarker,
  handleTargetFound,
}) => {
  async function handleSelectItem(e) {
    const targetLi = e.target.closest('li');

    if (!targetLi) return;

    const targetIndex = targetLi.dataset.id;

    // Verify coordinates
    const response = await axios.post(
      `http://localhost:3000/targets/${image.id}`,
      {
        targetIndex,
        coordinates: { x, y },
      }
    );

    if (response.data.found) {
      // Show marker if target found
      handleAddMarker(response.data.target);
      handleTargetFound();
    }
  }

  return (
    <menu
      className={`dropdown-menu ${isVisible ? 'visible' : 'hidden'}`}
      style={{ top: y - 50, left: x + 40 }}
      onClick={handleSelectItem}
    >
      {/* Contains three images(the targets) */}
      <li data-id="0">
        <img src={firstImage} alt="Target 1" />
      </li>
      <li data-id="1">
        <img src={secondImage} alt="Target 2" />
      </li>
      <li data-id="2">
        <img src={thirdImage} alt="Target 3" />
      </li>
    </menu>
  );
};

export default DropdownMenu;
