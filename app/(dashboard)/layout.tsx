import "./styles.css";
import type { Metadata } from "next";
import WithState from "../validators/WithState";
import { Grid2 } from "@mui/material";
import { SidebarX } from "./dashboard/components/SidebarX";
import Navbar from "./dashboard/components/Navbar";

export const metadata: Metadata = {
  title: "Panel de control - Docudiocesis",
  description: "Documenta registros parroquiales de bautizos, matrimonios, confirmaciones entre otros, generando el acta y otras funcionalidades mas.",
};

export default async function DashLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <Grid2 lang="en" suppressHydrationWarning>
      <Navbar/>
      <WithState>
      <SidebarX/>
        {children} 
      </WithState> 
    </Grid2>
  );
}