import { Suspense, lazy } from "react";
import "./styles/index.less";

const Characters = lazy(() => import("./Characters"));

const App = () => {
    return (
        <div className="main-container">
            <Suspense fallback={<div>Loading...</div>}>
                <div className="nav-image"></div>
                <div className="container">
                    <Characters />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
