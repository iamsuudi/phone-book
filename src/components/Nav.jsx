export default function Nav({ setQuery }) {
    return (
        <section className="bg-base-300 w-full">
            <div className="navbar py-10 max-w-screen-xl bg-base-300 mx-auto">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">PhoneBook</a>
                </div>
                <div className="flex-none gap-5">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => {
                                setQuery(e.target.value);
                            }}
                            className="input input-bordered w-24 md:w-auto"
                        />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full p-5">
                                    <span>Ab</span>
                                </div>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
