import Image from "next/image";

import Menu from "./menu";
import DataTableDemo from "./table_1";



export default function Home() {
  return (
      <main className="flex flex-col items-center justify-between p-24">
        <Menu />
        <DataTableDemo />
    </main>
  );
}
