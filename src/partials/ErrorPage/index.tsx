import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorMessage.scss";

const ErrorPage: FC<ErrorPageProps> = ({ error, onRetry }) => {
    const navigate = useNavigate();
    const errorMessage = error?.message || "Bilinməyən xəta.";
    return (
        <Result
            status='error'
            title='Üzr istəyirik. Xəta ilə qarşılaşdıq.'
            subTitle={`Error: ${errorMessage}`}
            extra={[
                <Button key='come-back' onClick={() => navigate(-1)}>
                    Geri qayıt
                </Button>,
                <Button onClick={onRetry} key='try-again'>
                    Yenidən cəhd et
                </Button>,
            ]}
            className='error-wrapper'
        >
            <div className='desc'>
                <details>
                    <summary>Xəta təfərrüatları üçün klikləyin</summary>
                    {error?.stack?.split("\n").map((line) => (
                        <p key={line}>{line}</p>
                    ))}
                </details>
            </div>
        </Result>
    );
};

interface ErrorPageProps {
    error?: Error;
    onRetry: () => void;
}

export default ErrorPage;
