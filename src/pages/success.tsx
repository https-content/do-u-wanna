import { Box, Grid, Slide, TextField, Typography } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SuccessPage() {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        
    }, [])

    return (
        <>
            <Head>
                <title>You will not regret your choice</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/heart.svg" />
            </Head>
            <main className="bg-black w-screen h-screen flex justify-center items-center p-5 text-neutral-300">
                <Slide direction="down" timeout={500} in={!isLoading}>
                    <Box className="bg-neutral-900 p-5 rounded-xl">
                        <Grid container justifyContent="space-around" spacing={3} alignItems="center">
                            <Grid item xs={4}>
                                <Image src="/cat.gif" width={300} height={300} alt="" />
                            </Grid>
                            <Grid item xs={8}>
                                <Typography >
                                    O seu <b>NAMORADO 😎</b>  já foi notificado sobre sua decisão e retornará em breve...
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Slide>
            </main>
        </>
    )
}