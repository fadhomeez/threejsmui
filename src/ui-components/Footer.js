import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    //zIndex controls the overlay of how the font renders
    <footer
      style={{
        position: "relative",
        bottom: 25,
        width: "99.1%",
        zIndex: "10",
      }}
    >
      <Box
        sx={{ backgroundColor: "#000000", color: "white" }}
        // padding X-axis on mobile device is 3, small devices and above is 10
        px={{ xs: 3, sm: 5 }}
        py={{ xs: 5, sm: 5 }}
      >
        {/* this container is responsible for the width and margin of the footer */}
        <Container sx={{ maxWidth: "lg", marginTop: -7, fontSize: 18 }}>
          <Grid container spacing={5}>
            {/* on mobile screen it will take full 12 grid size, on small screen and abv, each one will take 4 grid space */}
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box sx={{ marginTop: 1 }}>
                <Link href="/" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Support
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>For Pet Owners</Box>
              <Box sx={{ marginTop: 1 }}>
                <Link href="/login" color="inherit">
                  Login
                </Link>
              </Box>
              <Box>
                <Link href="/signup" color="inherit">
                  Register
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  View My pets
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>For Service Providers</Box>
              <Box sx={{ marginTop: 1 }}>
                <Link href="/" color="inherit" sx={{}}>
                  My Services
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Register Adoption Facilities
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Other Services
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 5 }} pb={{ xs: 5, sm: 0 }}>
            MODULATE Pte. Ltd. &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
