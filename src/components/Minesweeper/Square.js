export default function Square(props) {
  const classList = "square " + (props.flipped === 1? "flipped" : "")
  const display = () => {
    switch (props.flipped) {
      case 1:
        return props.content === 'BOMB' ? '💣' : props.content;
      case -1:
        return '🚩';
      default:
        return '';
    }
  }

  return (
    <button className={classList} onClick={props.flip} style={{fontSize: props.fontSize}}  onContextMenu={(event) => {
      props.flag();
      event.preventDefault();
    }}>{ display() }
    </button>
  );
}