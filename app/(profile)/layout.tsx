import styles from './styles.module.css';
import DarkNav from "@/components/nav/dark-nav";
import { ReactNode } from "react";
import ProtectedPage from "../protected/page";
import Link from 'next/link';
import { headers } from 'next/headers';
import ProfileNav from './profile/components/profile-nav';

const ProfileLayout = ({children}: {children: ReactNode}) => {

    return (
        <ProtectedPage>
            <header>
                <DarkNav />
            </header>

            <main className={`${styles.profile_container}`}>
                <ProfileNav />
                
                { children }
            </main>
        </ProtectedPage>
    )
}

export default ProfileLayout;