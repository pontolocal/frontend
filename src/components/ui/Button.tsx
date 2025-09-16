interface ButtonProps {
  text: string;
  styles: string;
  icon?: string;
}

export const Button = ({text, icon, styles}: ButtonProps) => {
  return (
    <button className={`flex items-center gap-4 p-4 cursor-pointer h-12 rounded-xl w-full ${styles}`}>
      {icon ? (
        <img src={icon} alt="icon" />
      ) : (<></>)}
      <span>{text}</span>
    </button>
  )
}