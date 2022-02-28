import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import LinkButton from "../components/LinkButton";
import SingleNumberInput from "../components/Count7/SingleNumberInput";
import BatchTest from "../components/Count7/BatchTest";

export default function Count7() {
  const [inBatchTesting, setInBatchTesting] = useState(false);

  return (
    <header className="App-header">
      <LinkButton
        to="/"
        variant="main"
        text="Back"
        style={{ position: "fixed", left: 5, top: 5 }}
      />
      <Button
        variant="main"
        onClick={() => setInBatchTesting(!inBatchTesting)}
        style={{ position: "fixed", right: 5, top: 5 }}
      >
        {inBatchTesting ? "Single Input" : "Batch Testing"}
      </Button>

      <Container>
        {inBatchTesting ? <BatchTest /> : <SingleNumberInput />}
      </Container>
    </header>
  );
}
