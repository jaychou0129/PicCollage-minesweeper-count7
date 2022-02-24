import LinkButton from "../components/LinkButton";

export default function NotFound() {
  return (
    <header className="App-header">
      <LinkButton
        to="/"
        variant="main"
        text="Back"
        style={{ position: "fixed", left: 5, top: 5 }}
      />
      <p>Page Not Found.</p>
    </header>
  );
}