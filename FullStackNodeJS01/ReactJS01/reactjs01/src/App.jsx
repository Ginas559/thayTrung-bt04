import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import { useEffect } from "react"
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAccountApi } from "./util/api";
import { setAuth, setAppLoading } from "./redux/authSlice";

function App() {
    const dispatch = useDispatch();
    const appLoading = useSelector((state) => state.auth.appLoading);

    useEffect(() => {
        const fetchAccount = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                dispatch(setAppLoading(false));
                return;
            }

            dispatch(setAppLoading(true));
            const res = await getAccountApi();
            if (res && !res.message) {
                dispatch(setAuth({
                    isAuthenticated: true,
                    user: {
                        email: res.email,
                        name: res.name
                    }
                }));
            }
            dispatch(setAppLoading(false));
        }
        fetchAccount()
    }, [dispatch])

    return (
        <div>
            {appLoading === true ?
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)"
                }}>
                    <Spin />
                </div>
                :
                <>
                    <Header />
                    <Outlet />
                </>
            }
        </div>
    )
}

export default App