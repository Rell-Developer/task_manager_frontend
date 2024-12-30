import { ReactElement } from "react";

type ButtonProps = {
    handleClick?: () => void;
    children: ReactElement;
    type: "submit" | "button";
    style?: "default" | "discard" | "remove";
    extraClasses?: string;
}

const Button = ({
    handleClick,
    children,
    type,
    style,
    extraClasses = ""
}: ButtonProps) => {

    const getColor = (): string => {
        if (style == "discard") {
            return "bg-slate-700";
        };

        if (style == "remove") {
            return "bg-red-600";
        }

        return "bg-color2";
    }

    return (
        <button
            type={type}
            className={`${getColor()} font-bold rounded px-3 py-2 text-white ${extraClasses}`}
            onClick={() => handleClick &&  handleClick()}
        >
            { children }
        </button>
    )
}

export default Button;