import Link from "next/link";
import API from "../../../services/api";

function VerifyPage({ message, response, user }) {
    return (
        <div
            style={{
                width: "calc(100vw - 60px)",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                margin: "0 30px",
                textAlign: "center",
                fontSize: "1.2rem",
            }}
        >
            <style jsx>
                {`
          .login-button {
            border: none;
            outline: none;
            padding: 6px 30px;
            border-radius: 2px;
            font-weight: 600;
            font-size: 0.95rem;
            margin-top: 6px;
            width: max-content;
            background: #bbb3;
            cursor: pointer;
            color: white;
          }
          .login_success_container{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center:center;
            max-width:600px;

          }
        `}
            </style>
            {response ? (
                <div className="login_success_container">
                    <p>
                        Hi {user.name}. Your account registered with {user.email} email
                        address has been verified successfully. You can now sign in and enjoy all the features of ZFlix.
                    </p>
                    <Link href={"/en/login"}>
                        <a>
                            <button className="login-button">Sign In</button>
                        </a>
                    </Link>
                </div>
            ) : (
                <div className="login_success_container" dangerouslySetInnerHTML={{__html:message}}></div>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const token = context.query.token || "";
        const res = await fetch(API.BASE_URL + "/verify-email?token=" + token);
        const resData = await res.json();
        return {
            props: {
                base_url: process.env.BASE_URL,
                message: resData.message || '',
                response: resData.response,
                user: resData.user || null,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
}

export default VerifyPage;
