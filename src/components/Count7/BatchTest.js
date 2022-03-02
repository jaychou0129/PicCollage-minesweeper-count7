import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

import MessageModal from "../MessageModal";

import {
  inputValidator,
  countNumbersWith7,
} from "../../scripts/Count7_scripts";

export default function BatchTest() {
  const [batchInput, setBatchInput] = useState(
    "3\n7\n20\n70\n75\n100\n700\n750\n1000"
  );
  const [batchOutput, setBatchOutput] = useState(
    "0\n1\n2\n8\n13\n19\n134\n184\n271"
  );

  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState("");

  const batchTestProc = () => {
    const inputArr = batchInput.split("\n");
    const outputArr = batchOutput.split("\n");
    const len = Math.min(inputArr.length, outputArr.length);
    let unitTestResults = "";
    for (let i = 0; i < len; i++) {
      unitTestResults += unitTestProc(inputArr[i], outputArr[i], i + 1);
    }
    setMessage(unitTestResults === "" ? "All tests passed!" : unitTestResults);
    setModalShow(true);
  };

  const unitTestProc = (input, expectedOutput, lineNumber) => {
    const inputValidatorMessage = inputValidator(input);
    if (inputValidatorMessage === "") {
      const n = parseInt(input);
      if (countNumbersWith7(n).toString() !== expectedOutput.trim()) {
        return `Wrong answer on test ${lineNumber}: Expected ${expectedOutput.trim()} but got ${countNumbersWith7(
          n
        )}!\n`;
      }
      return "";
    } else
      return `Wrong input format for test ${lineNumber}: ${inputValidatorMessage}\n`;
  };

  return (
    <>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Test Input</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Expected Output</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={batchOutput}
              onChange={(e) => setBatchOutput(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="success" onClick={batchTestProc}>
        Start Test
      </Button>

      <MessageModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        message={message}
      />
    </>
  );
}
