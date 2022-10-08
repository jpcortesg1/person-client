import { Box } from "@mui/material";
import { Container } from "@mui/system";
import TopBar from "./../bars/topBar/TopBar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <Box>
      <TopBar />
      <Box sx={{ pt: 5 }}>
        <Container>{children}</Container>
      </Box>
    </Box>
  );
}
