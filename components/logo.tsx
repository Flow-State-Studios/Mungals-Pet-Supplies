import Link from "next/link";



const Logo = ({styling = ''}: {styling: string}) => {
   return <Link href={'/'} className={`logo_container`}>
        <h5 className={`brand_name ${styling}`}>Mungal's</h5>
        <p className={`brand_info ${styling}`}>Put Supplies</p>
    </Link>
}

export default Logo;