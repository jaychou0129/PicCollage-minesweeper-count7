import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  InputGroup,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCells,
  faBomb,
  faPlay,
  faPause,
  faArrowRotateBack,
} from "@fortawesome/free-solid-svg-icons";

export default function ConfigToolbar(props) {
  return (
    <ButtonToolbar style={{ position: "absolute", top: 10, right: 10 }}>
      <ButtonGroup className="me-2">
        <Button variant="success" onClick={props.easyButtonHandler}>
          Easy
        </Button>
        <Button variant="success" onClick={props.mediumButtonHandler}>
          Medium
        </Button>
        <Button variant="success" onClick={props.hardButtonHandler}>
          Hard
        </Button>
      </ButtonGroup>
      <InputGroup className="me-1">
        <InputGroup.Text>
          <FontAwesomeIcon icon={faTableCells} />
        </InputGroup.Text>
        <Form.Control
          placeholder="Board Size"
          value={props.sizeValue}
          readOnly
          style={{ width: 80 }}
        />
      </InputGroup>
      <InputGroup className="me-2">
        <InputGroup.Text>
          <FontAwesomeIcon icon={faBomb} />
        </InputGroup.Text>
        <Form.Control
          placeholder="Number of bombs"
          value={props.bombValue}
          readOnly
          style={{ width: 80 }}
        />
      </InputGroup>
      <ButtonGroup className="me-2">
        <Button variant="success" onClick={props.restartHandler}>
          <FontAwesomeIcon icon={faArrowRotateBack} />
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}
