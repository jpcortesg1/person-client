import { Box, Container } from "@mui/system";
import SideBar from "../bars/sideBar/SideBar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SideBar />
      <Box>
        <Container>{children}</Container>
      </Box>
    </>
  );
}
