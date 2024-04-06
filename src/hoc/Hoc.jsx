export default function Hoc({children}) {
    return (
        <div className="max-w-screen-xl w-full">
            {children}
        </div>
    );
}