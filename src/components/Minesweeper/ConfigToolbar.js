import {
  Button,
  ButtonGroup,
  InputGroup,
  Form,
  Stack,
  Offcanvas,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCells,
  faBomb,
  faGear,
  faArrowRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ConfigToolbar(props) {
  const [showSettingPanel, setShowSettingPanel] = useState(false);

  return (
    <>
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <Button
          variant="success"
          className="mx-2"
          onClick={() => setShowSettingPanel(true)}
        >
          <FontAwesomeIcon icon={faGear} />
        </Button>
        <Button variant="success" onClick={props.restartHandler}>
          <FontAwesomeIcon icon={faArrowRotateBack} />
        </Button>
      </div>
      <Offcanvas
        placement="end"
        show={showSettingPanel}
        onHide={() => setShowSettingPanel(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            <ButtonGroup>
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
            <InputGroup className="me-auto">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faTableCells} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Board Size"
                value={props.sizeValue}
                readOnly
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faBomb} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Number of bombs"
                value={props.bombValue}
                readOnly
              />
            </InputGroup>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
