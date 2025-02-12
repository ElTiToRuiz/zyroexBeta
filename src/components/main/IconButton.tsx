export const IconButton = ({ onClick, icon, label }: { onClick: () => void; icon: JSX.Element; label: string }) => (
    <button onClick={onClick} aria-label={label}>
        {icon}
    </button>
)