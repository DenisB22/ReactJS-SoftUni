import Img from '../../images/image.png';
import Attach from '../../images/attach.png';

export const InputMessage = () => {
    return (
        <div className="inputMessage">
            <input type="text" placeholder="Type something..." />
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" style={{display: "none"}} id="file" />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    );
};