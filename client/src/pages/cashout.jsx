import { Box, Button, Container, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useCurrency } from "../components/currencyContext";
import { useState } from "react";
import { useTheme } from "@emotion/react";

const Cashout = () => {
    const { soulCoins, setSoulCoins } = useCurrency();
    const theme = useTheme().palette
    const [currencyReturned, setCurrencyReturned] = useState({
        gold: Math.floor(soulCoins / 10),
        silver: Math.floor(soulCoins % 10),
        copper: (soulCoins * 10 % 10)
    });


    return (
        <Box sx={{ justifyContent: "center", display: 'flex', alignItems: "center" }}>
            <Container sx={{ width: 1 / 4 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="h6">Currency</Typography></TableCell>
                                <TableCell><Typography variant="h6">Amount</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(currencyReturned).map((currType) => (
                                <TableRow sx={{ backgroundColor: theme[currType].main }}>
                                    <TableCell>{currType}</TableCell>
                                    <TableCell>{currencyReturned[currType].toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button sx={{ justifyContent: "center", alignContent: "center", display: "flex" }} variant='contained' color='secondary' onClick={() => setSoulCoins(0)}>
                    Reset
                </Button>
            </Container>
        </Box >
    )
}

export default Cashout