import { WindowControls } from "#components";
import { photosLinks, gallery } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Mail, Search } from "lucide-react";

const Gallery = () => {
	return (
		<>
			<div id="window-header">
				<WindowControls target="photos" />
				<div className="flex-1" />
				<div className="flex items-center gap-3">
					<Mail className="icon" size={18} />
					<Search className="icon" size={18} />
				</div>
			</div>

			<div className="flex h-[500px]">
				<div className="sidebar">
					<h2>Photos</h2>
					<ul>
						{photosLinks.map(({ id, icon, title }) => (
							<li key={id}>
								<img src={icon} alt={title} />
								<p>{title}</p>
							</li>
						))}
					</ul>
				</div>

				<div className="gallery">
					<ul>
						{gallery.map(({ id, img }) => (
							<li key={id}>
								<img src={img} alt={`gallery-${id}`} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

const GalleryWindow = WindowWrapper(Gallery, "photos");

export default GalleryWindow;
