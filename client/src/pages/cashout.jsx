import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useCurrency } from "../components/currencyContext";
import { useState } from "react";

const Cashout = () => {
    const { soulCoins, setSoulCoins } = useCurrency();
    const [currencyReturned, setCurrencyReturned] = useState({
        gold: Math.floor(soulCoins / 10),
        silver: Math.floor(soulCoins % 10),
        copper: (soulCoins * 10 % 10)
    });
    return (
        <Box>
            <Container>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Currency</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(currencyReturned).map((currType) => (
                                <TableRow>
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