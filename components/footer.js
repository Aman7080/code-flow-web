import Container from "@components/container";
import Image from "next/image";
import { myLoader } from "@utils/all";


export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-sm text-center">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </div>
    </Container>
    
  );
}