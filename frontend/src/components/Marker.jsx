// Marker to mark the correct targets.
const Marker = ({ marker, children }) => {
  const style = {
    top: marker?.y,
    left: marker?.x,
  };

  return (
    <div className="marker" style={style}>
      {children}
    </div>
  );
};

export default Marker;
