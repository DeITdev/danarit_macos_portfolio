import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";
import { ModeToggle } from "#components/mode-toggle";

const Navbar = () => {
	const { openWindow } = useWindowStore();
	const [currentTime, setCurrentTime] = useState(() => dayjs().format("ddd D MMM h:mm A"));

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(dayjs().format("ddd D MMM h:mm A"));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<nav>
				<div>
					<img src="/images/logo.svg" alt="logo" />
					<p className="font-bold">Danar IT Portfolio </p>

					<ul>
						{navLinks.map(({ id, name, type }) => (
							<li key={id}>
								<button onClick={() => openWindow(type)}>
									{name}
								</button>
							</li>
						))}
					</ul>
				</div>

				<div>
					<ul>
						{navIcons.map(({ id, img }) =>
							img === "/icons/mode.svg" ? (
								<li key={id}>
									<ModeToggle />
								</li>
							) : (
								<li key={id}>
									<button type="button" className="nav-icon" aria-label={`icon-${img}`}>
										<img src={img} alt={`icon-${img}`} />
									</button>
								</li>
							),
						)}
					</ul>

					<time>{currentTime}</time>
				</div>
			</nav>

			{/* Mobile Nav */}
			<div className="sm:hidden absolute top-0 left-0 w-full px-6 py-2.5 flex justify-between items-center z-[9999] pointer-events-none">
				<time className="text-black dark:text-white text-[16px] font-semibold mt-1 tracking-wide">
					{dayjs(currentTime, "ddd D MMM h:mm A").format("h:mm A")}
				</time>

				{/* Decorative notch / Dynamic Island simulation — intentionally has no semantic content. Do not remove or alter without visual regression checks. */}
				<div className="w-[140px] h-[32px] bg-black rounded-[20px] absolute left-1/2 -translate-x-1/2 top-0 mt-2 z-50 pointer-events-auto shadow-md"></div>

				<div className="flex items-center gap-3 mt-1 text-black dark:text-white">
					<img src="/icons/wifi.svg" alt="wifi" className="w-[22px] opacity-90 dark:invert" />
					<svg width="28" height="13" viewBox="0 0 24 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
						<rect x="0.5" y="0.5" width="20" height="10" rx="3" stroke="currentColor" strokeWidth="1" />
						<rect x="2" y="2" width="17" height="7" rx="1.5" fill="currentColor" />
						<path d="M22 3.5C22.8284 3.5 23.5 4.17157 23.5 5V6C23.5 6.82843 22.8284 7.5 22 7.5V3.5Z" fill="currentColor" opacity="0.5" />
					</svg>
				</div>
			</div>
		</>
	);
};

export default Navbar;
