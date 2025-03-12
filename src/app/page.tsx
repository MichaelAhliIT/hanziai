import Image from "next/image";
import { TranslationPages } from "./components/features/translation";
import { Container } from "./components/ContainerComponent";

export default function Home() {
  return (
    <Container>
      <TranslationPages />
    </Container>
  );
}
