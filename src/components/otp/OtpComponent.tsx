import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../redux/actions/user/userActions';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

interface TempData {
    username: string;
    email: string;
    password: string;
    otp?: string;
}

function OtpComponent({ userData }: { userData: TempData }) {
    const dispatch = useDispatch<AppState>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    // const [errors, setError] = useState<string>("");
    const [otp1, setOtp1] = useState<string>("");
    const [otp2, setOtp2] = useState<string>("");
    const [otp3, setOtp3] = useState<string>("");
    const [otp4, setOtp4] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(120);
    // const [focusedInput, setFocusedInput] = useState<number>(0);
    const [showResend, setShowResend] = useState<boolean>(false);

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    clearInterval(timer);
                    setShowResend(true);
                    setLoading(false)
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);


    useEffect(() => {
        inputRefs[0].current?.focus();
    }, []);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        
        if (minutes > 0) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds.toString().padStart(2, '0')} seconds`;
        } else {
            return `${seconds} second${seconds !== 1 ? 's' : ''}`;
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        switch (index) {
            case 1:
                setOtp1(value);
                break;
            case 2:
                setOtp2(value);
                break;
            case 3:
                setOtp3(value);
                break;
            case 4:
                setOtp4(value);
                break;
            default:
                break;
        }
        if (value.length === 1 && index <= inputRefs.length - 1) {
            inputRefs[index].current?.focus();
        }
    };

    const handleBackSpace = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            switch (index) {
                case 1:
                    setOtp1("");
                    break;
                case 2:
                    setOtp2("");
                    break;
                case 3:
                    setOtp3("");
                    break;
                case 4:
                    setOtp4("");
                    break;
                default:
                    break;
            }
            if (index > 0) {
                inputRefs[index - 2].current?.focus();
            }
        }
    };

    const handleToResendOtp = async () => {
        setCountdown(120);
        setShowResend(false);
        // setLoading(true);
        try {
            const { otp,...restData } = userData
            const res = await dispatch(signupUser(restData));
            console.log("Resend OTP successful",res);
            toast.success("OTP resent successfully");
        } catch (error: any) {
            console.error("Resend OTP error", error);
            toast.error("Failed to resend OTP");
        } finally {
            setLoading(false)
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        
        setLoading(true);

        event.preventDefault();
        const joinedOtp = otp1 + otp2 + otp3 + otp4;
        userData.otp = joinedOtp;
        const otpPattern = /^[0-9]{4}$/;

        if (!otpPattern.test(userData.otp)) {
            toast.error("Invalid OTP");
            setLoading(false);
            return;
        }

        try {
            const res = await dispatch(signupUser(userData));
            if (res.payload?.success) {
                setLoading(false);
                toast.success("Signup successful");
                navigate('/');
            }else {
                setLoading(false);
                console.log(res.payload);
                toast.error(res.payload)
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className='mt-8' onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16 justify-center items-center mt-36">
                    <h1 className='font-bold text-2xl text-darkBlue'>Enter Your Otp Here</h1>
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        {[otp1, otp2, otp3, otp4].map((otp, index) => (
                            <div key={index} className="w-16 h-16">
                                <input
                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                    minLength={1}
                                    required
                                    ref={inputRefs[index]}
                                    maxLength={1}
                                    type="text"
                                    name={`otp-${index + 1}`}
                                    id={`otp-${index + 1}`}
                                    value={otp}
                                    // onFocus={() => setFocusedInput(index)}
                                    onChange={(e) =>
                                        handleOtpChange(index + 1, e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        handleBackSpace(index + 1, e)
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    {loading && (
                        <div className="flex justify-center items-center">
                            <ClipLoader size={50} color={"#300370"}  />
                        </div>
                    )}

                    <div className="flex flex-col space-y-5">
                        <div>
                            <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-darkBlue font-bold hover:bg-white hover:text-darkBlue text-white text-sm shadow-sm" disabled={loading}>
                                Verify Account
                            </button>
                        </div>
                        <div className='text-white text-center'>
                            {!showResend && (
                        <span className='text-yellow-700'>{`OTP Valid For: ${formatTime(countdown)}`}</span>
                    )}
                        </div>
                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                            <p className='font-bold'>Didn't receive code?</p>{""}
                            {showResend && (
                                <button
                                    type='button'
                                    onClick={handleToResendOtp}
                                    className='font-bold text-darkBlue'
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default OtpComponent;
