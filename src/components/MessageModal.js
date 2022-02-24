import { Button, Modal } from "react-bootstrap";

export default function MessageModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.message.split("\n").map((str, id) => (
          <p key={id}>{str}</p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        {props.additionalButtons}
      </Modal.Footer>
    </Modal>
  );
}
