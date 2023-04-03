import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
    //const navigation = useNavigation();
    return <>
    <MainNavigation/>
    <main>
        {/* loading indicatior to let us know whether data has been loaded or not. 
        For this we use useNavigationHook */}
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet/>
    </main>
    </>;
};

export default RootLayout;
