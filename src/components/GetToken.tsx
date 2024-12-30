import useTask from "../hooks/useTask";
import Button from "./Button";

const GetToken = () => {
    const { refreshToken } = useTask();
    return (
        <Button
            type="button"
            handleClick={() => refreshToken()}
        >
            <p>Refrescar Token</p>
        </Button>
    )
}

export default GetToken;