import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./NotFound.scss";

export const NotFound = function () {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <section className='not-found-container'>
            <div className='wrapper'>
                <h3 className='status'>404</h3>
                <p className='pathname'>
                    Axtardığınız səhifə tapılmadı: <code>{location.pathname}</code>
                </p>
                <Button size='large' type='primary' onClick={() => navigate(-1)} className='back-btn'>
                    Geri qayıt
                </Button>
            </div>
        </section>
    );
};
