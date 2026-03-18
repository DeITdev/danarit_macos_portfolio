import useWindowStore from "#store/window";

import type { WindowKey } from "#types";

interface WindowControlsProps {
    target: WindowKey;
}

const WindowControls = ({ target }: WindowControlsProps) => {
    const { closeWindow } = useWindowStore();

    return (
        <div id="window-controls">
            <button
                type="button"
                className="close"
                aria-label="Close window"
                onClick={() => closeWindow(target)}
            />
            <button
                type="button"
                className="minimize"
                aria-label="Minimize window"
                disabled
                aria-disabled="true"
                title="Minimize is not supported"
            />
            <button
                type="button"
                className="maximize"
                aria-label="Maximize window"
                disabled
                aria-disabled="true"
                title="Maximize is not supported"
            />
        </div>
    );
};

export default WindowControls;
