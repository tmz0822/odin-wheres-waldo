const ClickBox = ({ x, y, isVisible }) => {
  return (
    <div
      className={isVisible ? 'visible' : 'hidden'}
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: '50px',
        height: '50px',
        transform: `translate(-25px, -25px)`,
        backgroundColor: '#000',
        opacity: 0.4,
        borderRadius: '50%',
        pointerEvents: 'none',
      }}
    ></div>
  );
};

export default ClickBox;
