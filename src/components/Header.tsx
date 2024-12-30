import GetToken from "./GetToken";

const Header = () => {
    return (
        <header className='w-full bg-color2 min-h-14 flex'>
            <div className='px-5 items-center flex justify-between w-full'>
                <div className='items-center'>
                    <span className='uppercase font-bold text-white'>Task Manager</span>
                </div>
                <GetToken/>
            </div>
        </header>
    )
}

export default Header