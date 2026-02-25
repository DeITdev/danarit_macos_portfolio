import useWindowStore from "#store/window";

interface WindowControlsProps {
    target: string;
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
            <button type="button" className="minimize" aria-label="Minimize window" />
            <button type="button" className="maximize" aria-label="Maximize window" />
        </div>
    );
};

export default WindowControls;
