import Logo from '../../assets/logo.svg'

interface ILogoImageProps {
    className: string;
}

const LogoImage = ({className}:ILogoImageProps) => {
    return <>
        <img src={Logo} alt="Logo" className={className} />
    </>
}

export default LogoImage