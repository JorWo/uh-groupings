import Link from 'next/link';
import { Container, Group } from '@mantine/core';
import Role from '@/access/Role';
import Image from 'next/image';

const Navbar = async () => {
    return ( 
        <nav className="border-b-[1px]">
            <Container py={9}>
                <Group justify="space-between">
                    <Link href="/">
                        <Image 
                            src="uhgroupings/uh-groupings-logo.svg" 
                            alt="UH Groupings Logo" 
                            width={256} 
                            height={256} />
                    </Link>
                
                    <Group>
                        <Link href="/about" className="text-lg text-uh-black hover:text-uh-teal">About</Link>
                    </Group>
                </Group>
            </Container>
        </nav>
    );
}
 
export default Navbar;