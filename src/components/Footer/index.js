import { FcLike } from "react-icons/fc";
import './footer.scss';

export default function Footer(){
  return(
    <div className="footer-container">
       <span>Developed with <FcLike/> by 
        <a target="_blank" rel="noreferrer" href="https://github.com/GalloGabriel"> Gabriel Gallo</a>
       </span> 
    </div>
  );
}