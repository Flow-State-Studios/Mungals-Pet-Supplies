


const Logo = ({styling = ''}: {styling: string}) => {
   return <div className={`logo_container`}>
        <h5 className={`brand_name ${styling}`}>Mungal's</h5>
        <p className={`brand_info ${styling}`}>Put Supplies</p>
    </div>
}

export default Logo;