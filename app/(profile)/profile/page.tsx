import { createClient } from '@/utils/supabase/server';
import styles from '../styles.module.css';
import Link from 'next/link';

const Profile = async () => {
    const supabase = createClient();
    const {data: { user }} = await supabase.auth.getUser();
    
    return (
        <section>
            {
                user?.is_anonymous 
                ? <section className={`${styles.anonymous_user_section}`}>
                    
                </section>
                : <section className={`${styles.user_section}`}>
                    
                </section>
            }
        </section>
    )
}

export default Profile;