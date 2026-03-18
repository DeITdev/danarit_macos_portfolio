import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";
import { ModeToggle } from "#components/mode-toggle";

const Navbar = () => {
	const { openWindow } = useWindowStore();
	const [currentTime, setCurrentTime] = useState(() => dayjs().format("ddd MMM D h:mm A"));

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(dayjs().format("ddd MMM D h:mm A"));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
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
								<img src={img} className="icon-hover" alt={`icon-${img}`} />
							</li>
						),
					)}
				</ul>

				<time>{currentTime}</time>
			</div>
		</nav>
	);
};

export default Navbar;
