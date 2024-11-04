import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        navbar: {
            main: "#27292b",
            contrastText: "#dadee3"
        },
        gold: {
            main: "#ffc733",
            contrastText: "#2e2e2e"
        },
        silver: {
            main: "#e0e0e4",
            contrastText: "#4287f5"
        },
        copper: {
            main: "#9b7c3a",
            contrastText: "#4287f5"

        },
        soul: {
            main: "#3b3b3d",
            contrastText: "#4287f5"
        },
        dark: {
            main: "#212121",
            contrastText: "#e3e3e3"
        },
    }
})

export default theme