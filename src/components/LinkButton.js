import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function LinkButton(props) {
  return (
    <div style={props.style}>
    <Link to={props.to}>
      <Button variant={props.variant} size={props.size}>
        {props.text}
      </Button>
    </Link>
    </div>
  );
}