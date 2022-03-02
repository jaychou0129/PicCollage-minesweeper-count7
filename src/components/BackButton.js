import LinkButton from "./LinkButton";

export default function BackButton() {
  return (
    <LinkButton
      to="/"
      variant="main"
      text="Back"
      style={{ position: "fixed", left: 5, top: 5 }}
    />
  );
}
