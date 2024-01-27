import { Container, Grid, GridCol, Text } from '@mantine/core';
import Image from 'next/image';

const Footer = () => ( 
    <footer className="bottom-0 absolute py-12 w-full bg-uh-black font-sans">
        <Container>
            <Grid>
                <GridCol span={{ sm: 5, md: 4}} className="text-center">
                    <Image 
                        src="uhgroupings/uh-logo-system.svg" 
                        alt="UH System logo" 
                        width={235} 
                        height={235} 
                        className="mb-1" />
                </GridCol>
                <GridCol span={{ sm: 7, md: 8}} className="text-white text-left">
                    <Text>The University of Hawai&#699;i is an <a 
                        href="https://www.hawaii.edu/offices/eeo/policies/?policy=antidisc" 
                        className="underline hover:text-gray-300">equal opportunity/affirmative action institution</a>.
                    </Text>
                    <Text mt="md">Use of this site implies consent with our <a
                        href="https://www.hawaii.edu/policy/docs/temp/ep2.210.pdf" 
                        className="underline hover:text-gray-300" title="UH Usage Policy"> Usage Policy</a>.
                    </Text>
                </GridCol>
            </Grid>
        </Container>
    </footer>
);

export default Footer;
