import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getQuestions } from "../../utils/fetchCombos";
import { getUserProfile } from "../../utils/fetchUsers";
import { answerAuth, updatePassAuth } from "../../utils/fetchAuth";

import Header from "../../components/Header/Header";

import "./forgotPassword.css"

export async function loader(){

    const questions = await getQuestions();
    return {questions}
}

const ForgotPassword = () => {
    
    const [email, setEmail] = React.useState("");
    const [readEmail, setReadEmail] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [answer, setAnswer] = React.useState("");
    const [answerBool, setAnswerBool] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    
    const {questions} = useLoaderData();

    const navigate = useNavigate();

    const findEmail = async (email) => {
        const response = await getUserProfile(email);
        if (response.status === 200){
            setUser(await response.json());
        } else {
            setReadEmail(false);
            setUser(null);
        }
    }

    useEffect(() => {
        if (user) {
            setReadEmail(true);
        }
    }, [user]);

    const handleRecovery = async (e) => {
        e.preventDefault();
        setAnswerBool(await answerAuth(answer, email))
    }

    useEffect(() => {
        if (answerBool) {
            updatePassAuth(email, newPassword)
                .then(() => {
                    navigate("/login")
                })
                .catch(err => console.error(err)); 
        }
    }, [answerBool, email, navigate, newPassword]);


  return (
    <>
        <Header currentPage={"login"} />
        <div className="main-forgot">
            <h1>Recuperar contraseña</h1>
            <form onSubmit={handleRecovery}>
                <label>Email</label>
                <input 
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) =>{
                        setEmail(e.target.value);
                        findEmail(e.target.value);
                    }}
                    required />

                {
                    readEmail && (
                        <>
                            <h2>{questions.find(question => question.id === user.security_question_id).question}</h2>
                            <label>Respuesta de seguridad</label>
                            <input type="text" name="security_answer" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                            <label>Nueva contraseña<input type="password" name="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required /></label>
                            
                            <input type="submit" value ="Cambiar contraseña"/>
                        </>
                    )
                }

            </form>
        </div>
    </>
    )
}

export default ForgotPassword;