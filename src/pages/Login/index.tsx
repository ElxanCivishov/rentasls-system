import { default as Logo } from "@/assets/logo.svg";
import { default as icareImg } from "@/assets/icareImg.jpg";
import { FormBuilder, FormDetails, TInputChange, TInputValidation } from "@/components/FormBuilder";
import { useValidation } from "@/hooks/UseValidation";
import { ROUTES } from "@/routes/consts";
import AuthService from "@/service/AuthService";
import { Button } from "antd";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import "./Login.scss";

export default function Login() {
    const navigate = useNavigate();
    const [signInDetails, setSignInDetails] = useState({
        email: "",
        password: "",
    });
    const { handleValidInput, checkValidate, isFormValid, resetForm } = useValidation(requiredFields);

    const onInputChange = function ({ key, value }: TInputChange) {
        setSignInDetails((currentState) => {
            return {
                ...currentState,
                [key]: value,
            };
        });
    };

    const signIn = function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const isValid = isFormValid({ informUser: true });
        if (!isValid) return false;

        validateUserCredentials();
    };

    const validateUserCredentials = async function () {
        const response = await AuthService.loginUser(signInDetails);

        if (response.token) {
            navigate(ROUTES.DASHBOARD.LINK);
        }
    };

    return (
        <div className='login-wrapper'>
            <div className='leftSide'>
                <div className='logo-wrapper'>
                    <div className='logo'>
                        <img src={Logo} alt='logo' />
                    </div>
                    <h2>İcarə sahələrinin idarə edilməsi</h2>
                </div>
                <form onSubmit={signIn}>
                    <FormBuilder
                        form={{
                            inputs: formFields.map((item) => ({
                                ...item,
                                required: true,
                                checkValidate,
                                resetForm,
                                setIsValid: handleValidInput,
                            })),
                            onChange: (details) => onInputChange(details as TInputChange),
                            values: signInDetails,
                            options: {},
                        }}
                    />

                    <Button htmlType='submit' type='primary'>
                        Daxil olun
                    </Button>
                </form>
            </div>
            <div className="rightSide">
            <img src={icareImg} alt='logo' />
            </div>
        </div>
    );
}

const formFields: Array<FormDetails> = [
    {
        label: "Email",
        type: "text",
        key: "email",
        validator: "EmailValidator",
        placeholder: "Email adresini qeyd edin",
    },
    {
        label: "Şifrə",
        type: "text",
        key: "password",
        placeholder: "Şifrəni qeyd edin",
        validator: "LengthValidator",
        informUser: true,
        minLength: 8,
    },
];

const requiredFields: TInputValidation[] = [
    { key: "email", isValid: false },
    { key: "password", isValid: false },
];
