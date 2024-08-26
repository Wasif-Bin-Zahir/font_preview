// src/components/layout/Navbar.tsx

import Image from 'next/image';

const Navbar = () => {
	return (
		<nav>
			<div>
				<div className="navbar bg-neutral px-[100px]">
					<div className="flex-1">
						<a href="/">
							<Image
								src="/images/logo.png"
								alt="Logo"
								width={128} // Adjust to your image's width
								height={64} // Adjust to your image's height
								priority // Optionally add priority to preload the image
							/>
						</a>
					</div>
					<div className="flex-none gap-2">
						{/* <div className="form-control ">
							<input
								type="text"
								placeholder="Search Font Here"
								className="input input-bordered w-24 md:w-auto"
							/>
						</div> */}
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									<img
										alt="Tailwind CSS Navbar component"
										src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									/>
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
							>
								<li>
									<a className="justify-between">
										Profile
										{/* <span className="badge">New</span> */}
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

				{/* Top Navigation Bar */}
				<nav className="bg-gray-300 p-3 px-[75px]">
					<div className="flex justify-between items-center px-[30px]">
						<div className="flex space-x-5">
							<a
								href="/"
								className="relative after:content-['|'] after:ml-5 after:text-gray-500 last:after:content-none"
							>
								Home
							</a>
							<a
								href="/submit-font"
								className="relative after:content-['|'] after:ml-5 after:text-gray-500 last:after:content-none"
							>
								Submit a font
							</a>
							<a
								href="/contactUs"
								className="relative after:content-['|'] after:ml-5 after:text-gray-500 last:after:content-none"
							>
								Contact Us
							</a>
						</div>
						<div className="flex space-x-5 ">
							<a
								href="/admin"
								className="relative after:content-['|'] after:ml-5 after:text-gray-500 last:after:content-none"
							>
								Admin Login
							</a>
							{/* <a href="#" className="">
								Register
							</a> */}
						</div>
					</div>
				</nav>
			</div>
		</nav>
	);
};

export default Navbar;
