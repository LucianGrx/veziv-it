import './Footer.scss';
import { SlSocialGithub, SlSocialLinkedin, SlSocialYoutube  } from "react-icons/sl";
import { CiMail } from "react-icons/ci";
const Footer = () => {
  return (
    <footer className='app__footer'>
        <div className='app__container'>
            <h3 className='title__footer'>Feel free to connect on social media.</h3>
            <div className='social__media'>
                <SlSocialGithub className='social__media__icon' />
                <SlSocialLinkedin className='social__media__icon' />
                <SlSocialYoutube className='social__media__icon' />
                <CiMail className='social__media__icon' />
            </div>
            <span>Developer with ❤️ by Biolan Lucian</span>
        </div>
    </footer>
  )
}

export default Footer