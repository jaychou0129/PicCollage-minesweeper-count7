import { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  inputValidator,
  countNumbersWith7,
} from "../../scripts/Count7_scripts";
import MessageModal from "../MessageModal";

export default function SingleNumberInput() {
  const [ans, setAns] = useState(-1);
  const [n, setN] = useState("N");
  const inputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const nChangedHandler = (event) => {
    const inputValidatorMessage = inputValidator(event.target.value);

    if (inputValidatorMessage === "") {
      const n = parseInt(event.target.value);
      setN(event.target.value);
      setAns(countNumbersWith7(n));
    } else {
      setN("N");
      setAns(-1);
      if (event.target.value !== "") {
        setMessage(inputValidatorMessage);
        setShowModal(true);
      }
    }
  };

  return (
    <>
      <p>How many numbers from 1 to {n} contain 7?</p>
      <Form.Control
        placeholder="Enter N here"
        type="number"
        min="1"
        onChange={nChangedHandler}
        ref={inputRef}
      />
      <p className="my-5" style={{ visibility: ans === -1 ? "hidden" : null }}>
        Answer: {ans}
      </p>
      <MessageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        message={message}
      />
    </>
  );
}
