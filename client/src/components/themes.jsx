import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        navbar: {
            main: "#27292b",
            contrastText: "#dadee3"
        },
        gold: {
            main: "#ffc733",
            contrastText: "#2e2e2e",
        },
        silver: {
            main: "#e0e0e4",
            contrastText: "#2e2e2e",
            secondary: "#b5945b"
        },
        copper: {
            main: "#9c773d",
            contrastText: "#2e2e2e",
            secondary: "#b5945b"
        },
        soul: {
            main: "#3b3b3d",
            contrastText: "#4287f5"
        },
        dark: {
            main: "#212121",
            contrastText: "#e3e3e3"
        },
        fiendsFavor: {
            main: "#3a3a49",
            contrastText: "#fefefe",
            secondary: "#98a3a1"
        },
        deathRoll: {
            main: "#443747",
            contrastText: "#fff"
        }
    }
})

export default theme