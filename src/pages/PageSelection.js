import { Row, Col } from "react-bootstrap";
import LinkButton from "../components/LinkButton";

export default function PageSelection() {
  return (
    <header className="App-header">
      <p>Select one of the following to continue.</p>
      <Row>
        <Col>
          <LinkButton to="/minesweeper" variant="main" size="xxl" text="Minesweeper" />
        </Col>
        <Col>
          <LinkButton to="/count7" variant="main" size="xxl" text="Count 7's" />
        </Col>
      </Row>
    </header>
  );
}
